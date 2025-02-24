<?php
require "Tables/ProjectRepository.php";

$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$car_id = $_POST['car_id'];
$budget = $_POST['budget'];

if (isset($name) && isset($description) && isset($start_date) && isset($end_date)
    	&& isset($car_id) && $car_id > 0 && isset($id) && $id > 0 && isset($budget) && $budget > 0) {
	$db = new ProjectRepository();
	$db->updateProjectById($id, $name, $description, $start_date, $end_date, $car_id, $budget);
}
?>