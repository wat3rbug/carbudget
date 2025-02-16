<?php
require "Tables/CarRepository.php";
$id = $_POST["id"];

if (isset($_FILES["file"]) && isset($id)) {
    $filename = basename($_FILES["file"]["name"]);
    $basefile = $id . "_" . $filename;
    $target = "pictures/" . $basefile;
    $db = new CarRepository();
    $db->editPicture($id, $basefile);
    // if (move_uploaded_file($_FILES["file"]["tmp_name"], $target)) {
    //     // $db = new CarRepository();
    //     // $db->editPicture($id, $basefile);
    // }
}
