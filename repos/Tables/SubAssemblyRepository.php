<?php
class SubAssemblyRepository {

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
	
	function getTagById($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * from ProjectSubAssemblys WHERE id = ? AND deleted = 0";
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
	
	function removeTagById($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE ProjectSubAssemblys SET deleted = 1 WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function getAllTags() {
		$sql = "SELECT b.*, a.sa_name FROM SubAssemblys AS a JOIN ProjectSubAssemblys AS b ON a.id = b.sub_assembly WHERE a.deleted = 0 AND b.deleted = 0";
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