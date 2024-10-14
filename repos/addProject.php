<?php
require "Tables/ProjectRepository.php";

$name = $_POST['name'];
$description = $_POST['description'];
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$car_id = $_POST['car_id'];
$budget = $_POST['budget'];
$user = $_POST['user'];

// $name = 'M20 Turbo';
// $description = 'Put a turbo in the car using the M20 motor';
// $start_date = '2020-7-1';
// $end_date = '2020-12-31';
// $car_id = 1;
// $budget = 10000;
// $user = 1;

if (isset($name) && isset($description) && isset($start_date) && isset($end_date) && isset($car_id) && $car_id > 0 && isset($budget) && isset($user) && $user > 0) {
	$db = new ProjectRepository();
	$db->addProject($name, $description, $start_date, $end_date, $car_id, $budget, $user);
}
?>