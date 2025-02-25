<?php
require "Tables/PartOrderRepository.php";

$part = $_POST['part'];
$unitcost = $_POST['unitcost'];
$quantity = $_POST['quantity'];
$vendor = $_POST['vendor'];
$orderdate = $_POST['orderdate'];

// $part = "4";
// $unitcost = "5";
// $quantity = "2";
// $vendor = "11";
// $orderdate = '2025-02-25';
 
if (isset($part) && isset($unitcost) && isset($quantity) && isset($vendor) && isset($orderdate)) {
	$db = new PartOrderRepository();
	$db->addPartOrder($part, $unitcost, $quantity, $vendor, $orderdate);
}
?>