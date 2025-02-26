<?php
require "Tables/PartOrderRepository.php";
// $istool = $_POST["istool"];
$istool = "1";

if (isset($istool)) {
    $db = new PartOrderRepository();
    $data = $db->getAllPOsAbbreviated($istool);
    header('Content-type: application/json');
    echo json_encode($data);
} 
?>