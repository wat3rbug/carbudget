<?php
require "Tables/InventoryRepository.php";

$part = $_POST['part'];
// $part = 1;
if (isset($part) && $part > 0) {
	$db = new InventoryRepository();
	$data = $db->getToolById($part);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>