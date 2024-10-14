<?php
require "Tables/CarRepository.php";

$id = $_POST['id'];
$make = $_POST['make'];
$model = $_POST['model'];
$color = $_POST['color'];
$year = $_POST['year'];

if (isset($make) && isset($model) && isset($color) && isset($year) && isset($id) && $id > 0) {
	$db = new CarRepository();
	$db->updateCarById($make, $model, $color, $year, $id);
}
?>