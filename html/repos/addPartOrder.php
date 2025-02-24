<?php
require "Tables/PartOrderRepository.php";

$part = $_POST['part'];
$unitcost = $_POST['unitcost'];
$quantity = $_POST['quantity'];
$vendor = $_POST['vendor'];
$orderdate = $_POST['orderdate'];

// $part = 3;
// $vendor = 11;
// $unitcost = 9.99;
// $quantity = 1;
// $orderdate = '2025-02-18';
 
if (isset($part) && isset($unitcost) && isset($quantity) && isset($vendor) && isset($orderdate)) {
	$db = new PartOrderRepository();
	$db->addPartOrder($part, $unitcost, $quantity, $vendor, $orderdate);
}
?>