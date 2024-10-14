<?php
require "Tables/ToolRepository.php";

$name = $_POST['name'];
$description = $_POST['description'];


if (isset($name)) {
	$db = new ToolRepository();
	$db->addTool($name, $description);
}
?>