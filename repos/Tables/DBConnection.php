<?php

class DBConnection {

        public $database;
        public $username;
        public $hostname;
        public $password;

        function __construct() {
                $this->password = "1990BMW325!";
                $this->database = "carbudget";
                $this->hostname = "phobos";
                $this->username = "carbudgetuser";
        }
}
?>
