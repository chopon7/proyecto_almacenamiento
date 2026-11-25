<?php

function responder($datos, int $codigo = 200): void
{
    http_response_code($codigo);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit;
}

// Lee el cuerpo JSON de la petición. Devuelve [] si viene vacío o inválido.
function leerJson(): array
{
    $datos = json_decode(file_get_contents('php://input'), true);
    return is_array($datos) ? $datos : [];
}