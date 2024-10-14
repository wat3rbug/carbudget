<?php
class InventoryRepository {

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
	
	function getToolsInStock() {
		$sql = "SELECT * FROM v_tools_in_stock WHERE deleted = 0";
		$statement = $this->conn->prepare($sql);
		$statement->execute();
		$output = array();
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function getToolById($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * FROM v_tools_in_stock WHERE id = ? AND deleted = 0";
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
	
	function getPartsInStock() {
		$sql = "SELECT p.name, pft.quantity FROM parts_for_task as pft JOIN parts AS p ON p.id = pft.po_id WHERE pft.deleted = 0";
		$statement = $this->conn->prepare($sql);
		$statement->execute();
		$output = array();
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function getInventoryById($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * FROM v_parts_in_stock WHERE id = ? AND deleted = 0";
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
	function updateInventoryById($part, $quantity, $location) {
		if (isset($part) && isset($quantity) && $quantity > 0 && $part > 0) {
			$sql = "UPDATE inventory SET quantity = ?, location = ? WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $quantity);
			$statement->bindParam(2, $location);
			$statement->bindParam(3, $part);
			$statement->execute();
		}
	}
	
	function removeInventoryById($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE inventory SET deleted = 1 WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function addInventory($make, $model, $color, $year) {
		if (isset($make) && isset($model) && isset($color) && isset($year)) {
			$sql = "INSERT INTO inventory (make, model, color, year) VALUES(?, ?, ?, ?)";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $make);
			$statement->bindParam(2, $model);
			$statement->bindParam(3, $color);
			$statement->bindParam(4, $year);
			$statement->execute();
		}	
	}	
	
	function getAllToolInventory() {
		$sql = "SELECT * FROM v_tools_in_stock";
		$statement = $this->conn->prepare($sql);
		$statement->execute();
		$output = array();
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function getAllInventory() {
		$sql = "SELECT * FROM v_parts_in_stock";
		$statement = $this->conn->prepare($sql);
		$statement->execute();
		$output = array();
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
}
?>