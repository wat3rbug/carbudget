<?php
require "Tables/VendorRepository.php";
$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new VendorRepository();
	$db->removeVendorById($id);
}
?>