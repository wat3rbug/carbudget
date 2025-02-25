<?php
class ProcedureRepository {

	private $conn;

	function __construct() {

        include_once("DBConnection.php");
        $db = new DBConnection();
        $servername = $db->hostname;
        $username = $db->username;
        $password = $db->password;
        $charset = "utf8mb4";
        $database = $db->database;
        $dsn = "mysql:host=$servername;dbname=$database;charset=$charset";
        $options = [
                PDO::ATTR_ERRMODE                               => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE    => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES              => true,
        ];
        try {
                $this->conn = new PDO($dsn, $username, $password);
        } catch (\PDOException $e) {
                throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
	}

    function getProceduresForTask($task) {
        if (isset($task)) {
            $sql = "SELECT * FROM Procedures WHERE task_id = ? ORDER BY id";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $task);
            $statement->execute();
            $output = array();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
        }
    }

    function addProcedure($title, $link, $task) {
        if (isset($task) && isset($link) && isset($title)) {
            $sql = "INSERT INTO Procedures (title, link, task_id) VALUES (?, ?, ?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $title);
            $statement->bindParam(2, $link);
            $statement->bindParam(3, $task);
            $statement->execute();
        }
    }

    function updateProcedure($title, $link, $id) {
        if (isset($task) && isset($link) && isset($title)) {
            $sql = "UPDATE TABLE Procedures SET title = ?, link = ?, WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $title);
            $statement->bindParam(2, $link);
            $statement->bindParam(3, $id);
            $statement->execute();
        }
    }

    function removeProcedure($id) {
        if (isset($id)) {
            $sql = "DELETE FROM Procedures WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }
}
	