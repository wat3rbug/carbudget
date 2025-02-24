<?php
require "Tables/TaskRepository.php";

$task = $_POST['task'];

if (isset($task) && $task > 0) {
	$db = new TaskRepository();
	$db->toggleTaskComplete($task);
}
?>