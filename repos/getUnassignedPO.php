<?php
require "Tables/PartOrderRepository.php";

$db = new PartOrderRepository();
$data = $db->getUnassingedPO();
header('Content-type: application/json');
echo json_encode($data);

?>