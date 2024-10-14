<?php
require "Tables/CarRepository.php";

$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new CarRepository();
	$data = $db->getCarById($id);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>