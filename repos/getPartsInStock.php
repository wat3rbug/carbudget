<?php
require "Tables/InventoryRepository.php";

$db = new InventoryRepository();
$data = $db->getPartsInStock();
header('Content-type: application/json');
echo json_encode($data);
?>