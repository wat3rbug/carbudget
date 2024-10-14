<?php
require "Tables/PartOrderRepository.php";

$part = $_POST['part'];
$unitcost = $_POST['unitcost'];
$quantity = $_POST['quantity'];
$vendor = $_POST['vendor'];
$orderdate = $_POST['orderdate'];

// $part = 7;
// $vendor = 2;
// $unitcost = 145;
// $quantity = 4;
// $orderdate = '2020-6-1';
 
if (isset($part) && isset($unitcost) && isset($quantity) && isset($vendor) && isset($orderdate)) {
	$db = new PartOrderRepository();
	$db->addPartOrder($part, $unitcost, $quantity, $vendor, $orderdate);
}
?>