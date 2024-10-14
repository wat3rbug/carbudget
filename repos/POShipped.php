<?php
require "Tables/PartOrderRepository.php";

$request = $_POST['request'];
// $request = 1;
if (isset($request) && $request > 0) {
	$db = new PartOrderRepository();
	$db->poShipped($request);
}
?>