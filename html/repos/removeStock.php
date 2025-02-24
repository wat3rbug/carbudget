<?php
require "Tables/InventoryRepository.php";

$part = $_POST['part'];

if (isset($part) && $part > 0) {
	$db = new InventoryRepository();
	$db->removeInventoryById($part);
}
?>