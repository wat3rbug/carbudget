<?php
require "Tables/PartRepository.php";

$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new PartRepository();
	$data = $db->getPartById($id);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>