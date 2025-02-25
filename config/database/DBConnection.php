<?php

class DBConnection {

        public $database;
        public $username;
        public $hostname;
        public $password;

        function __construct() {
                $this->password = "[your_password]";
                $this->database = "carbudget";
                $this->hostname = "[host]";
                $this->username = "carbudgetuser";
        }
}
// It should be noted that this file must be the repo/Tables directory so that the other file can use it for connection.
?>
