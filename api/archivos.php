<?php
require __DIR__ . '/helpers.php';
require __DIR__ . '/db.php';

// Usuario que hace la petición. Mientras no exista el inicio de sesión, es el usuario 1.
// TODO: cuando el login guarde $_SESSION['usuario_id'], quitar el "?? 1".
session_start();
$usuarioId = (int) ($_SESSION['usuario_id'] ?? 1);

function validarArchivo(array $d): array
{
    $nombre = trim($d['nombre'] ?? '');
    $tipo   = trim($d['tipo'] ?? '');
    $tipos  = ['carpeta', 'documento', 'audio', 'video', 'imagen', 'datos', 'comprimido'];

    if ($nombre === '' || strlen($nombre) > 255 || strpbrk($nombre, '/\\') !== false) {
        responder(['error' => 'El nombre debe tener entre 1 y 255 caracteres y no puede llevar / ni \\'], 422);
    }
    if (!in_array($tipo, $tipos, true)) {
        responder(['error' => 'El tipo debe ser uno de: ' . implode(', ', $tipos)], 422);
    }
    return [$nombre, $tipo];
}

try {

    $pdo = conectar();
    $method = $_SERVER['REQUEST_METHOD'];
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    switch ($method) {
        case 'GET':
            if ($id !== null) {
                $stmt = $pdo->prepare(
                    'SELECT id, nombre, tipo, propietario, fecha FROM archivos WHERE id = :id AND usuario_id = :usuario'
                );
                $stmt->execute(['id' => $id, 'usuario' => $usuarioId]);
                $archivo = $stmt->fetch();

                if (!$archivo) {
                    responder(['error' => 'No se encontró el archivo'], 404);
                }
                responder($archivo);
            }

            $buscar = trim($_GET['buscar'] ?? '');
            $stmt = $pdo->prepare(
                'SELECT id, nombre, tipo, propietario, fecha FROM archivos
                 WHERE usuario_id = :usuario AND nombre LIKE :buscar ORDER BY id'
            );
            $stmt->execute(['usuario' => $usuarioId, 'buscar' => "%$buscar%"]);

            responder($stmt->fetchAll());
            break;

        case 'POST':
            [$nombre, $tipo] = validarArchivo(leerJson());
            $fecha = date('Y-m-d');

            $stmt = $pdo->prepare(
                'INSERT INTO archivos (usuario_id, nombre, tipo, propietario, fecha)
                 VALUES (:usuario, :nombre, :tipo, :propietario, :fecha)'
            );
            $stmt->execute([
                'usuario'     => $usuarioId,
                'nombre'      => $nombre,
                'tipo'        => $tipo,
                'propietario' => 'Tú',
                'fecha'       => $fecha,
            ]);

            responder([
                'id'          => (int) $pdo->lastInsertId(),
                'nombre'      => $nombre,
                'tipo'        => $tipo,
                'propietario' => 'Tú',
                'fecha'       => $fecha,
            ], 201);
            break;

        case 'PUT':
            if ($id === null) {
                responder(['error' => 'Falta el id'], 400);
            }
            [$nombre, $tipo] = validarArchivo(leerJson());

            // rowCount() vale 0 también cuando no cambia ningún valor,
            // así que verificamos primero que exista y que sea del usuario.
            $existe = $pdo->prepare('SELECT id FROM archivos WHERE id = :id AND usuario_id = :usuario');
            $existe->execute(['id' => $id, 'usuario' => $usuarioId]);
            if (!$existe->fetch()) {
                responder(['error' => 'No se encontró el archivo'], 404);
            }

            $stmt = $pdo->prepare(
                'UPDATE archivos SET nombre = :nombre, tipo = :tipo WHERE id = :id AND usuario_id = :usuario'
            );
            $stmt->execute(['nombre' => $nombre, 'tipo' => $tipo, 'id' => $id, 'usuario' => $usuarioId]);

            $stmt = $pdo->prepare('SELECT id, nombre, tipo, propietario, fecha FROM archivos WHERE id = :id');
            $stmt->execute(['id' => $id]);
            responder($stmt->fetch());
            break;

        case 'DELETE':
            if ($id === null) {
                responder(['error' => 'Falta el id'], 400);
            }

            $stmt = $pdo->prepare('DELETE FROM archivos WHERE id = :id AND usuario_id = :usuario');
            $stmt->execute(['id' => $id, 'usuario' => $usuarioId]);

            if ($stmt->rowCount() === 0) {
                responder(['error' => 'No se encontró el archivo'], 404);
            }
            http_response_code(204);   // éxito sin cuerpo
            exit;

        default:
            responder(['error' => 'Método no permitido'], 405);
    }

} catch (PDOException $ex) {
    responder(['error' => 'Ocurrió un error'], 500);
}
