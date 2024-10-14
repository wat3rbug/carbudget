<?php
require "Tables/PartOrderRepository.php";
$request = $_POST['request'];
// $id = 1;
if (isset($request) && $request > 0) {
	$db = new PartOrderRepository();
	$db->removePOByRequest($request);
}
?>