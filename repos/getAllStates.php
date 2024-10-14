<?php
require "Tables/StateRepository.php";

$db = new StateRepository();
$data = $db->getAllStates();
header('Content-type: application/json');
echo json_encode($data);	
?>