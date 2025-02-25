<?php
require "Tables/ProcedureRepository.php";
$db = new ProcedureRepository();
$data = $db->getAllProcedures();
header('Content-type: application/json');
echo json_encode($data);
?>