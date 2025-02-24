<?php
require "Tables/VendorRepository.php";

$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new VendorRepository();
	$data = $db->getVendorById($id);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>