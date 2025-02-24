<?php
require "Tables/CarRepository.php";

$make = $_POST['make'];
$model = $_POST['model'];
$color = $_POST['color'];
$year = $_POST['year'];

if (isset($make) && isset($model) && isset($color) && isset($year)) {
	$db = new CarRepository();
	$db->addCar($make, $model, $color, $year);
}
?>