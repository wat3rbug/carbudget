<?php
require "Tables/ToolRepository.php";

$db = new ToolRepository();
$data = $db->getAllTools();
header('Content-type: application/json');
echo json_encode($data);
?>