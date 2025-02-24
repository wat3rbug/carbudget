<?php

class DBConnection {

        public $database;
        public $username;
        public $hostname;
        public $password;

        function __construct() {
                $this->password = "[your_password]";
                $this->database = "carbudget";
                $this->hostname = "[hostname]";
                $this->username = "carbudgetuser";
        }
}
?>
