<?php
require "Tables/PartOrderRepository.php";

$request = $_POST['request'];
// $request = 1;

if (isset($request) && $request > 0) {
	$db = new PartOrderRepository();
	$data = $db->getPOByRequestId($request);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>