<?php
require "Tables/CarRepository.php";
$upload = "../upload/";
// $id = 1;
$file = $_POST['file'];
$id = $_POST['id'];
$data = $_POST['data'];

// get file name

// $file = "/Users/douglas/Downloads/bernie.jpg";
$fp  = fopen($file, "r");
$data = fread($fp, filesize($file));
fclose($fp);

// strip off postfix

$pos = strrpos($file, ".");
$ext = substr($file, $pos);

// generate filename randomly
// repeat while file name exists
do {
	$seed = substr(str_shuffle(str_repeat('abcdefghijklmnopqrstuvwxyz'
		. 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)), 0, 8);
	$test = $seed . $ext;
} while (file_exists($upload . $test));

// save file

$fp = fopen($upload . $test, 'w');
fwrite($fp, $data, filesize($file));
fclose($fp);

// update database

$db = new CarRepository();
$db->editPicture($id, $test); 
?>