<?php
class PartRepository {

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
	
	function checkPartExists($name, $description, $num) {
		if (isset($name) && isset($description)) {
			$sql = "SELECT * FROM Parts WHERE istool = 0 AND deleted = 0 AND name = ? AND description = ? AND part_num = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $name);
			$statement->bindParam(2, $description);
			$statement->bindParam(3, $num);
			$statement->execute();
			$output = array();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
		}
	}
	
	function getPartById($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * from Parts WHERE id = ? AND deleted = 0 AND istool = 0";
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
	function updatePartById($name, $description, $id, $num) {
		if (isset($name) && isset($description) && isset($id) && $id > 0) {
			$sql = "UPDATE Parts SET name = ?, description = ?, part_num = ? WHERE id = ? AND istool = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $name);
			$statement->bindParam(2, $description);
			$statement->bindParam(3, $num);
			$statement->bindParam(4, $id);
			$statement->execute();
		}
	}
	
	function removePartById($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE Parts SET deleted = 1 WHERE id = ? AND istool = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function addPart($name, $description, $num) {
		if (isset($name) && isset($description)) {
			$sql = "INSERT INTO Parts (name, description, part_num, istool) VALUES(?, ?, ?, 0)";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $name);
			$statement->bindParam(2, $description);
			$statement->bindParam(3, $num);
			$statement->execute();
		}	
	}	
	
	function getAllParts() {
		$sql = "SELECT * from Parts where deleted = 0 AND istool = 0 AND name <> 'shipping'";
		$statement = $this->conn->prepare($sql);
		$statement->execute();
		$output = array();
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function getFilteredParts($filter) {
		if (isset($filter) && strlen($filter) > 2) {
			$filter = "%$filter%";
			$sql = "SELECT * FROM `Parts` WHERE `deleted` = 0 AND `istool` = 0 AND `name` <> 'shipping' AND (`name` LIKE :name OR `description` LIKE :name)";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(':name', $filter);
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