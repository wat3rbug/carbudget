<?php
class VendorRepository {

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
	function getVendorById($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * from Vendors WHERE id = ? AND deleted = 0";
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
	function updateVendorById($name, $url, $address1, $address2, $city, $state, $zipcode, $country, $id) {
		if (isset($name) && isset($url) && isset($id) && $id > 0) {
			$sql = "UPDATE Vendors SET name =?, url = ?, address1 = ?, address2 = ?, city =?, state = ?, zipcode = ?, country = ? WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $name);
			$statement->bindParam(2, $url);
			$statement->bindParam(3, $address1);
			$statement->bindParam(4, $address2);
			$statement->bindParam(5, $city);
			$statement->bindParam(6, $state);
			$statement->bindParam(7, $zipcode);
			$statement->bindParam(8, $country);
			$statement->bindParam(9, $id);
			$statement->execute();
		}
	}
	
	function removeVendorById($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE Vendors SET deleted = 1 WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function addVendor($name, $url, $address1, $address2, $city, $state, $zipcode, $country) {
		if (isset($name) && isset($url)) {
			$sql = "INSERT INTO Vendors (name, url, address1, address2, city, state, zipcode, country) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $name);
			$statement->bindParam(2, $url);
			$statement->bindParam(3, $address1);
			$statement->bindParam(4, $address2);
			$statement->bindParam(5, $city);
			$statement->bindParam(6, $state);
			$statement->bindParam(7, $zipcode);
			$statement->bindParam(8, $country);
			$statement->execute();
		}	
	}	
	
	function getAllVendors() {
		$sql = "SELECT * from Vendors where deleted = 0";
		$statement = $this->conn->prepare($sql);
		$statement->execute();
		$output = array();
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function getFilteredVendors($filter) {
		if (isset($filter) && strlen($filter) > 2) {
			$filter = "%$filter%";
			$sql = "SELECT * FROM `Vendors` WHERE `deleted` = 0 AND (`name` LIKE :name OR `url` LIKE :name OR `address1` LIKE :name OR `address2` LIKE :name OR `city` LIKE :name)";
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