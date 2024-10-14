<?php
require "Tables/CarRepository.php";

$db = new CarRepository();
$data = $db->getAllCars();
header('Content-type: application/json');
echo json_encode($data);
?>