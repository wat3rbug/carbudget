<?php
require "Tables/ProjectRepository.php";

$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new ProjectRepository();
	$data = $db->getProjectById($id);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>