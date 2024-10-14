<?php
require "Tables/TaskRepository.php";

$user = $_POST['id'];

if (isset($user) && $user > 0) {
	$db = new TaskRepository();
	$data = $db->getAllTasks($user);
	header('Content-type: application/json');
	echo json_encode($data);	
}
?>