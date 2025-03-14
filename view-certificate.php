<?php
$file = 'assets/certs/English_for_IT_1_certificate.pdf';

if (!file_exists($file)) {
    http_response_code(404);
    die('File not found');
}

header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="' . basename($file) . '"');
readfile($file);
exit;
?>