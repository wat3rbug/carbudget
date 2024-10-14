<?php
require "Tables/CarRepository.php";
$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new CarRepository();
	$db->removeCarById($id);
}
?>