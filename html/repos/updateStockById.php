<?php
require "Tables/InventoryRepository.php";

$part = $_POST['part'];
$quantity = $_POST['quantity'];
$location = $_POST['location'];
if (isset($part) && $part > 0 && isset($quantity) && $quantity > 0) {
	$db = new InventoryRepository();
	$data = $db->updateInventoryById($part, $quantity, $location);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>