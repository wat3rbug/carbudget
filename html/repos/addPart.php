<?php
require "Tables/PartRepository.php";

$name = $_POST['name'];
// $num = $_POST['partnum'];
$description = $_POST['description'];
// $name = "Pi Camera v2";
// $description = "Uses the V42L library";



if (isset($name) && isset($description)) {
	$db = new PartRepository();
	$db->addPart($name, $description);
}
?>