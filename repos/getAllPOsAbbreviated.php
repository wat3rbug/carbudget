<?php
require "Tables/PartOrderRepository.php";

$db = new PartOrderRepository();
$data = $db->getAllPOsAbbreviated();
header('Content-type: application/json');
echo json_encode($data);
?>