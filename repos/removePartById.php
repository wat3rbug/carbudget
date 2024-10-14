<?php
require "Tables/PartRepository.php";
$id = $_POST['id'];
// $id = 1;
if (isset($id) && $id > 0) {
	$db = new PartRepository();
	$db->removePartById($id);
}
?>