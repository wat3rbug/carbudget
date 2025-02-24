<?php
require "Tables/TaskRepository.php";

$id = $_POST['id'];
// $id = 90;

if (isset($id) && $id > 0) {
	$db = new TaskRepository();
	$db->removeTask($id);
}
?>