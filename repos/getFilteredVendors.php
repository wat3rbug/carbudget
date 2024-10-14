<?php
require "Tables/VendorRepository.php";

$filter = $_POST['filter'];

if (isset($filter)) {
	$db = new VendorRepository();
	$data = $db->getFilteredVendors($filter);
	header('Content-type: application/json');
	echo json_encode($data);
}

?>