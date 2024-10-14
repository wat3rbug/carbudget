<?php
require "Tables/TaskRepository.php";

$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];

if (isset($id) && isset($name) && isset($description) && $id > 0) {
	$db = new TaskRepository();
	$db->addTask($id, $name, $description);
}
?>