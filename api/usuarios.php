<?php

require __DIR__ . '/helpers.php';

// 1. Cargar usuarios iniciales desde el arreglo PHP
$usuariosBase = require __DIR__ . '/data/usuarios.php';

// 2. Cargar usuarios nuevos guardados en el archivo JSON
$rutaNuevos = __DIR__ . '/data/usuarios_nuevos.json';
$usuariosNuevos = [];

if (file_exists($rutaNuevos)) {
    $contenido = file_get_contents($rutaNuevos);
    $decodificado = json_decode($contenido, true);
    if (is_array($decodificado)) {
        $usuariosNuevos = $decodificado;
    }
}

// 3. Unir el arreglo inicial con los nuevos registros
$todos = $usuariosBase;
foreach ($usuariosNuevos as $u) {
    $todos[] = $u;
}

$metodo = $_SERVER['REQUEST_METHOD'];

// MÉTODO GET: Listar todos o buscar por ID
if ($metodo === 'GET') {
    if (isset($_GET['id'])) {
        $id = (int) $_GET['id'];

        foreach ($todos as $usuario) {
            if ($usuario['id'] === $id) {
                responder($usuario, 200);
            }
        }

        responder(['error' => 'Usuario no encontrado'], 404);
    }

    responder($todos, 200);
}

// MÉTODO POST: Validar y registrar usuario
if ($metodo === 'POST') {
    $entrada = json_decode(file_get_contents('php://input'), true);

    if (!is_array($entrada)) {
        responder(['error' => 'El cuerpo de la petición debe ser un JSON válido'], 422);
    }

    $nombre = trim($entrada['nombre_usuario'] ?? '');
    $contrasenia = $entrada['contrasenia'] ?? '';
    $correo = trim($entrada['correo'] ?? '');
    $plan = trim($entrada['plan'] ?? '');
    $terminos = $entrada['terminos_aceptados'] ?? false;

    $planesValidos = ['basico', 'pro', 'master'];

    // Validaciones en el servidor
    if (strlen($nombre) < 3) {
        responder(['error' => 'El nombre debe tener al menos 3 caracteres'], 422);
    }

    if (strlen($contrasenia) < 8) {
        responder(['error' => 'La contraseña debe tener al menos 8 caracteres'], 422);
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        responder(['error' => 'El correo electrónico no es válido'], 422);
    }

    if (!in_array($plan, $planesValidos)) {
        responder(['error' => 'La modalidad seleccionada no es válida'], 422);
    }

    if (!$terminos) {
        responder(['error' => 'Debes aceptar los términos y condiciones'], 422);
    }

    // Verificar que el correo no esté repetido
    foreach ($todos as $u) {
        if (strtolower($u['correo']) === strtolower($correo)) {
            responder(['error' => 'Ese correo electrónico ya está registrado'], 422);
        }
    }

    // Asignar ID consecutivo 
    $ultimoId = 0;
    foreach ($todos as $u) {
        if ($u['id'] > $ultimoId) {
            $ultimoId = $u['id'];
        }
    }

    $nuevoUsuario = [
        'id' => $ultimoId + 1,
        'nombre_usuario' => $nombre,
        'correo' => $correo,
        'plan' => $plan,
        'fecha_registro' => date('Y-m-d'),
    ];

    // Guardar en el arreglo de nuevos 
    $usuariosNuevos[] = $nuevoUsuario;
    file_put_contents(
        $rutaNuevos,
        json_encode($usuariosNuevos, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)
    );

    responder($nuevoUsuario, 201);
}
