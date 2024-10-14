<?php
require "Tables/SubAssemblyRepository.php";
$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new SubAssemblyRepository();
	$db->removeTagById($id);
}
?>