<?php
require "Tables/ProjectRepository.php";

$sa = $_POST['sa_name'];
$project = $_POST['project'];

// $sa = "electronic fabrication";
// $project = "7";

if (isset($sa) && isset($project)) {
	$db = new ProjectRepository();
	$db->addTag($sa, $project);
}
?>