-- Base de datos de Temu Drive.
-- Ejecútalo en phpMyAdmin (pestaña SQL) o con: mysql -u root < api/sql/temu_drive.sql

CREATE DATABASE IF NOT EXISTS temu_drive CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE temu_drive;

CREATE TABLE IF NOT EXISTS archivos (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id  INT UNSIGNED NOT NULL,           -- dueño del archivo: cada usuario solo ve los suyos
    nombre      VARCHAR(255) NOT NULL,
    tipo        VARCHAR(20)  NOT NULL,           -- carpeta, documento, audio, video, imagen, datos, comprimido
    propietario VARCHAR(50)  NOT NULL,           -- el texto que muestra la tarjeta ("Tú", "Amukiri"...)
    fecha       DATE         NOT NULL
);

-- Los mismos archivos de data/archivos.json, para el usuario 1
INSERT INTO archivos (usuario_id, nombre, tipo, propietario, fecha) VALUES
    (1, 'Reporte de usuarios.pdf',    'documento',  'Tú',      '2026-10-30'),
    (1, 'Jose jose musica chida.wav', 'audio',      'Tú',      '2026-10-30'),
    (1, 'Vacaciones.mp4',             'video',      'Amukiri', '2026-11-02'),
    (1, 'Foto perfil.png',            'imagen',     'Tú',      '2026-11-05'),
    (1, 'Ventas 2026.csv',            'datos',      'Jacobo',  '2026-11-08'),
    (1, 'Respaldo.zip',               'comprimido', 'Tú',      '2026-11-10');
