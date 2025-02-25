<?php
require "Tables/ProcedureRepository.php";
$task = $_POST['task'];
$title = $_POST['title'];
$link = $_POST['link'];

if (isset($task) && isset($title) && isset($link)) {
	$db = new ProcedureRepository();
	$db->addProcedure($title, $link, $task);
}
?>