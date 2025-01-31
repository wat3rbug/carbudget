<?php
class TaskRepository {

	private $conn;

	function __construct() {

        include_once("DBConnection.php");
        $db = new DBCOnnection();
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
	
	function toggleTaskComplete($task) {
		$sql = "UPDATE tasks SET completed = completed XOR 1 WHERE id = ?";
		$statement = $this->conn->prepare($sql);
		$statement->bindParam(1, $task);
		$statement->execute();
	}
	
	function updateTaskById($id, $name, $description) {
		if (isset($id) && isset($name) && isset($description) && $id > 0) {
			$sql = "UPDATE tasks SET name = ?, description = ? WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $name);
			$statement->bindParam(2, $description);
			$statement->bindParam(3, $id);
			$statement->execute();
		}	
	}
	
	function getTaskById($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * FROM tasks WHERE id = ? AND deleted = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			$output = array();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
		}
	}
	
	function removeTask($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE tasks SET deleted = 1 WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function addTask($id, $name, $description) {
		if (isset($id) && isset($name) && isset($description) && $id > 0) {
			$sql = "INSERT INTO tasks (project_id, name, description) VALUES (?, ?, ?)";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->bindParam(2, $name);
			$statement->bindParam(3, $description);
			$statement->execute();
		}	
	}

	function getAllTasks($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT Tasks.* FROM Tasks JOIN Projects ON Tasks.project_id = Projects.id JOIN Users on Users.id = Projects.user WHERE Tasks.deleted = 0 AND Projects.user = ? AND completed = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			$output = array();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
		}
	}
}
?>	
