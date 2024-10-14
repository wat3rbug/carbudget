<?php
require "Tables/VendorRepository.php";

// $name = $_POST['name'];
// $url = $_POST['url'];
// $address1 = $_POST['address1'];
// $address2 = $_POST['address2'];
// $city = $_POST['city'];
// $state = $_POST['state'];
// $zipcode = $_POST['zipcode'];
// $country = $_POST['country'];

$name = 'getBMWParts';
$url = "www.getBMWParts.com";
$address1 = "";
$address2 = "";
$city = "";
$state = "";
$zipcode = "";
$country = "";
if ($zipcode == "") $zipcode = null;

if (isset($name) && isset($url)) {
	$db = new VendorRepository();
	$db->addVendor($name, $url, $address1, $address2, $city, $state, $zipcode, $country);
}
?>