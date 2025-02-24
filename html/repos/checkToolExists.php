<?php
require "Tables/PartRepository.php";

$name = $_POST['name'];
$description = $_POST['description'];
// $name = "test";
// $num = "1234";
// $description = "this is a test";

if (isset($name) && isset($description)) {
	$db = new PartRepository();
	$data = $db->checkToolExists($name, $description);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>