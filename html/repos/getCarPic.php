<?php
require "Tables/CarRepository.php";
$id = $_POST['id'];
// $id = 1;
if (isset($id) && $id > 0) {
	$db = new CarRepository();
	$data = $db->getCarPic($id);
	header('Content-type: application/json');
	echo json_encode($data);
}

?>