<?php
require "Tables/VendorRepository.php";

$db = new VendorRepository();
$data = $db->getAllVendors();
header('Content-type: application/json');
echo json_encode($data);
?>