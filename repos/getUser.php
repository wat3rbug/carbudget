<?php
require "Tables/UserRepository.php";
$email = $_POST['email'];
$password = $_POST['password'];
// $email = "doug.gardiner@gmail.com";
// $password = "gywxy7-qofxyf-Rumjog";

if (isset($email) && isset($password)) {
	$db = new UserRepository();
	$data = $db->getUserFromLoginCreds($email, $password);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>