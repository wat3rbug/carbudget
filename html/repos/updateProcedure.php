<?php
require "Tables/ProcedureRepository.php";
$id = $_POST['id'];
$title = $_POST['title'];
$link = $_POST['link'];

if (isset($id) && isset($title) && isset($link)) {
	$db = new ProcedureRepository();
	$db->updateProcedure($title, $link, $id);
}
?>