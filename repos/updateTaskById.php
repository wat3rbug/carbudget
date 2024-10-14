<?php
require "Tables/TaskRepository.php";

$id =$_POST['id'];
$name = $_POST['name'];
$description= $_POST['description'];


if (isset($id) && $id > 0 && isset($name) && isset($description)) {
	$db = new TaskRepository();
	$db->updateTaskById($id, $name, $description);
}
?>