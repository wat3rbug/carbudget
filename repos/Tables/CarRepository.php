<?php
class CarRepository {

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
	function getCarById($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * from Cars WHERE id = ? AND deleted = 0";
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
	function updateCarById($make, $model, $color, $year, $id) {
		if (isset($make) && isset($model) && isset($color) && isset($year) && isset($id) && $id > 0) {
			$sql = "UPDATE Cars SET make =?, model = ?, color = ?, year = ? WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $make);
			$statement->bindParam(2, $model);
			$statement->bindParam(3, $color);
			$statement->bindParam(4, $year);
			$statement->bindParam(5, $id);
			$statement->execute();
		}
	}
	
	function removeCarById($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE Cars SET deleted = 1 WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function addCar($make, $model, $color, $year) {
		if (isset($make) && isset($model) && isset($color) && isset($year)) {
			$sql = "INSERT INTO Cars (make, model, color, year) VALUES(?, ?, ?, ?)";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $make);
			$statement->bindParam(2, $model);
			$statement->bindParam(3, $color);
			$statement->bindParam(4, $year);
			$statement->execute();
		}	
	}	
	
	function getAllCars() {
		$sql = "SELECT * from Cars where deleted = 0";
		$statement = $this->conn->prepare($sql);
		$statement->execute();
		$output = array();
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function getCarPic($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT picture FROM Cars WHERE id = ? AND deleted = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			$output =array();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output[0]['picture'];
		}
	}
	function addCarPic($id, $pic) {
		if (isset($id) && isset($pic)) {
			$sql = "UPDATE Cars SET picture = ? WHERE id = ? AND deleted = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(2, $id);
			$statement->bindParam(1, $pic);
			$statement->execute();
		}
	}
	
	function getPicFromId($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT picture FROM Cars WHERE id = ? AND deleted = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			$output = array();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output[0]['picture'];
		}
	}
	
	function editPicture($id, $pic) {
		if (isset($id) && isset($pic) && $id > 0) {
			$sql = "UPDATE Cars SET picture = ? WHERE id = ? AND deleted = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $pic);
			$statement->bindParam(2, $id);
			$statement->execute();
		}
	}
}
?>