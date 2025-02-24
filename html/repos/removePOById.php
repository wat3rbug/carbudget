<?php
require "Tables/PartOrderRepository.php";
$id = $_POST['id'];
// $id = 1;
if (isset($id) && $id > 0) {
	$db = new PartOrderRepository();
	$db->removePOById($id);
}
?>