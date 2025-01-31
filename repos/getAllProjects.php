<?php
require "Tables/ProjectRepository.php";

$id = $_POST['id'];
// $id = "1";

if (isset($id) && $id > 0) {
	$db = new ProjectRepository();
	$data = $db->getAllProjects($id);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>