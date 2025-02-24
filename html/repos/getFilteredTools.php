<?php
require "Tables/PartRepository.php";

$filter = $_POST['filter'];

if (isset($filter)) {
	$db = new PartRepository();
	$data = $db->getFilteredTools($filter);
	header('Content-type: application/json');
	echo json_encode($data);
}

?>