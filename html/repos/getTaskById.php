<?php
require "Tables/TaskRepository.php";

$id = $_POST['id'];
// $id =1;

if (isset($id) && $id > 0) {
	$db = new TaskRepository();
	$data = $db->getTaskById($id);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>