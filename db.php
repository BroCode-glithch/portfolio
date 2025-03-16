<?php
$host = '127.0.0.1'; // AWebServer default MySQL host
$db = 'portfolio_db';
$user = 'root';
$pass = 'root'; // No password by default

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database Connection Failed: " . $e->getMessage());
}
?>