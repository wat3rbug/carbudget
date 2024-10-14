<?php
require "Tables/SubAssemblyRepository.php";

$db = new SubAssemblyRepository();
$data = $db->getAllTags();
header('Content-type: application/json');
echo json_encode($data);

?>