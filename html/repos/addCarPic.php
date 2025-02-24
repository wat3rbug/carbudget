<?php
require "Tables/CarRepository.php";
$upload = "../upload/";
// $id = 1;
$file = $_POST['file'];
$id = $_POST['id'];
$data = $_POST['data'];

$db = new CarRepository();
$oldFile = $db->getPicFromId($id);
if (isset($oldFile)) {
	$fp = fopen($upload . $oldFile, 'w');
	fwrite($fp, $data, filesize($file));
	fclose($fp);
} else { 
	// read from stream
	$fp  = fopen($file, "r");
	$data = fread($fp, filesize($file));
	fclose($fp);
	
	$pos = strrpos($file, ".");
	$ext = substr($file, $pos);
	
	do {
		$seed = substr(str_shuffle(str_repeat('abcdefghijklmnopqrstuvwxyz'
			. 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)), 0, 8);
		$test = $seed . $ext;
	} while (file_exists($upload . $test));
	
	// write stream to file 
	$fp = fopen($upload . $test, 'w');
	fwrite($fp, $data, filesize($file));
	fclose($fp);
		
	// update database 
	$db->addCarPic($id, $test); 
}
?>