<?php
class ProjectRepository {

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
	function addTag($sa, $project) {
		if (isset($sa) && isset($project)) {

			$this->conn->beginTransaction();
			$sql = "INSERT INTO subassemblies (sa_name) VALUES (?)";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $sa);
			$statement->execute();
			$sql = "SELECT id FROM subassemblies WHERE sa_name = ? ORDER BY id DESC LIMIT 1";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $sa);
			$statement->execute();
			$id = array();
			while($row = $statement->fetch()) {
				$id[] = $row;
			}
			$sql = "INSERT INTO project_sub_assemblies (project_id, sub_assembly) VALUES (?, ?)";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $project);
			$statement->bindParam(2, $id[0]['id']);
			$statement->execute();
			$this->conn->commit();
		}
	}
	
	function getProjectById($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * from projects WHERE id = ? AND deleted = 0";
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
	function updateProjectById($id, $name, $description, $start_date, $end_date, $car_id, $budget) {
		if (isset($name) && isset($description) && isset($start_date) && isset($end_date)
		    	&& isset($car_id) && $car_id > 0 && isset($id) && $id > 0 && isset($budget) && $budget > 0) {
			$sql = "UPDATE projects SET name = ?, description = ?, start_date = ?, end_date = ?, car_id = ?, starting_budget = ? WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $name);
			$statement->bindParam(2, $description);
			$statement->bindParam(3, $start_date);
			$statement->bindParam(4, $end_date);
			$statement->bindParam(5, $car_id);
			$statement->bindParam(6, $budget);
			$statement->bindParam(7, $id);
			$statement->execute();
		}
	}
	
	function removeProjectById($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE projects SET deleted = 1 WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function addProject($name, $description, $start_date, $end_date, $car_id, $budget, $user) {
		if (isset($name) && isset($description) && isset($start_date) && isset($end_date) 
				&& isset($car_id) && $car_id > 0 && isset($budget) && isset($user) && $user > 0) {
			$sql = "INSERT INTO projects (name, description, start_date, end_date, car_id, starting_budget, user) VALUES(?, ?, ?, ?, ?, ?, ?)";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $name);
			$statement->bindParam(2, $description);
			$statement->bindParam(3, $start_date);
			$statement->bindParam(4, $end_date);
			$statement->bindParam(5, $car_id);
			$statement->bindParam(6, $budget);
			$statement->bindParam(7, $user);
			$statement->execute();
		}	
	}	
	
	function getAllProjects($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * FROM projects WHERE deleted = 0 AND user = ?";
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