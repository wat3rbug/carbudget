<?php
require "Tables/PartRepository.php";

$name = $_POST['name'];
$num = $_POST['partnum'];
$description = $_POST['description'];


if (isset($name) && isset($description)) {
	$db = new PartRepository();
	$db->addPart($name, $description, $num);
}
?>