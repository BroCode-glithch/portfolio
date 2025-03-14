<?php
$file = 'assets/certs/English_for_IT_1_certificate.pdf';

if (!file_exists($file)) {
    http_response_code(404);
    die('File not found');
}

// Set headers to display the PDF in the browser
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="English_for_IT_1_certificate.pdf"');
header('Content-Length: ' . filesize($file));
readfile($file);
exit;
?>