<?php
require "Tables/ProcedureRepository.php";

$task = $_POST["id"];
// $task = "5";
if (isset($task)) {
    $db = new ProcedureRepository();
    $data = $db->getProceduresForTask($task);
    header('Content-type: application/json');
	echo json_encode($data);
}