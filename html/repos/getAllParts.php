<?php
require "Tables/PartRepository.php";

$db = new PartRepository();
$data = $db->getAllParts();
header('Content-type: application/json');
echo json_encode($data);
?>