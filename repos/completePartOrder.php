<?php
require "Tables/PartOrderRepository.php";

$db = new PartOrderRepository();
$db->completePartOrder();

?>