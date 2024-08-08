<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: application/json; charset=utf-8');


$rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(dirname(__DIR__) . '/pages'));
$files = array();

/** @var SplFileInfo $file */
foreach ($rii as $file) {
    if ($file->isDir()) {
        continue;
    }
    if (str_ends_with($file->getPathname(), '.html')) {
        $files[] = substr(str_replace('\\', '/', $file->getPathname()), strlen(dirname(__DIR__)));
    }
}

$data = $files;

echo json_encode($data);
