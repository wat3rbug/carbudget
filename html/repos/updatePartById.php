<?php
require "Tables/PartRepository.php";

$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];
$num = $_POST['num'];

if (isset($name) && isset($description) && isset($id) && $id > 0) {
	$db = new PartRepository();
	$db->updatePartById($name, $description, $id, $num);
}
?>