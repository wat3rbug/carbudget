<?php
require "Tables/ProjectRepository.php";

$sa = $_POST['sa_name'];
$project = $_POST['project'];

if (isset($sa) && isset($project)) {
	$db = new ProjectRepository();
	$db->addTag($sa, $project);
}
?>