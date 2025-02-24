<?php
require "Tables/VendorRepository.php";

$id = $_POST['id'];
$name = $_POST['name'];
$url = $_POST['url'];
$address1 = $_POST['address1'];
$address2 = $_POST['address2'];
$city = $_POST['city'];
$state = $_POST['state'];
$zipcode = $_POST['zipcode'];
$country = $_POST['country'];

// $id = 1;
// $name = "FCP EURO";
// $url = "fcpeuro.org";
// $address1 = null;
// $address2 = null;
// $city = null;
// $state = null;
// $zipcode = null;
// $country = null;


if (isset($name) && isset($url) && isset($id) && $id > 0) {
	$db = new VendorRepository();
	$db->updateVendorById($name, $url, $address1, $address2, $city, $state, $zipcode, $country, $id);
}
?>