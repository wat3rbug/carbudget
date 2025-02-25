<?php
require "Tables/ProcedureRepository.php";
$id = $_POST['id'];
// $id = 1;
if (isset($id) && $id > 0) {
	$db = new ProcedureRepository();
	$db->removeProcedure($id);
}
?>