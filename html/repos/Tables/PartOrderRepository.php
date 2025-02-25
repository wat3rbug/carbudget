<?php
class PartOrderRepository {

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
	
	function completePartOrder() {
		$this->conn->beginTransaction();
		$sql = "SELECT request from PartOrders GROUP BY request ORDER BY request DESC LIMIT 1";
		$statement = $this->conn->prepare($sql);
		$statement->execute();
		$data = array();
		while ($row = $statement->fetch()) {
			$data[] = $row;
		}
		$request = $data[0]['request'] + 1;
		$sql = "UPDATE PartOrders SET request = ? WHERE request IS NULL AND deleted = 0";
		$statement = $this->conn->prepare($sql);
		$statement->bindParam(1, $request);
		$statement->execute();
		$this->conn->commit();
	}
	
	function getUnassingedPO() {
		$sql = "SELECT po.id, v.name,  p.name as part, po.unit_cost, po.quantity, po.unit_cost * po.quantity AS total  FROM PartOrders AS po JOIN Vendors AS v ON po.vendor_id = v.id  JOIN Parts AS p ON po.part_id = p.id WHERE po.deleted = 0 AND po.request is null";
		$statement = $this->conn->prepare($sql);
		$statement->execute();
		$output = array();
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function addPartOrder($part, $unitcost, $quantity, $vendor, $orderdate, $request) {
		if (isset($part) && isset($unitcost) && isset($quantity) 
				&& isset($vendor) && isset($orderdate) && isset($request)) {
			$sql = "INSERT INTO PartOrders (part_id, unit_cost, quantity, vendor_id, order_date, request) VALUES (?, ?, ?, ?, ?, ?)";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $part);
			$statement->bindParam(2, $unitcost);
			$statement->bindParam(3, $quantity);
			$statement->bindParam(4, $vendor);
			$statement->bindParam(5, $orderdate);
			$statement->bindParam(6, $request);
			$statement->execute();
		}
	}
	
	function poReceived($request) {
		if (isset($request) && $request > 0) {
			$this->conn->beginTransaction();
			$sql = "UPDATE PartOrders SET receive_date = curdate() WHERE request = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $request);
			$statement->execute();
			
			// should make this part a trigger
			
			$sql = "SELECT id, quantity FROM PartOrders WHERE request = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $request);
			$statement->execute();
			$output = array();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			foreach($output as $insertrow) {
				$sql = "SELECT p.name from PartOrders as po JOIN Parts as p on p.id = po.part_id WHERE po.id = ?";
				$statement = $this->conn->prepare($sql);
				$statement->bindParam(1, $insertrow['id']);
				$statement->execute();
				$test = array();
				while ($row = $statement->fetch()) {
					$test[] = $row;
				}
				if ($test[0]['name'] != 'shipping' && $test[0]['name'] != 'Shipping') {
					$sql = "INSERT INTO Inventorys (po_id, quantity) VALUES(?, ?)";
					$statement = $this->conn->prepare($sql);
					echo "id: " . $insertrow['id']. " qty: " .$insertrow['quantity'] . "\n";
					$statement->bindParam(1, $insertrow['id']);
					$statement->bindParam(2, $insertrow['quantity']);
					$statement->execute();
				}	
			}
			$this->conn->commit();
		}
	}
	
	function poShipped($request) {
		if (isset($request) && $request > 0) {
			$sql = "UPDATE PartOrders SET ship_date = curdate() WHERE request = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $request);
			$statement->execute();
		}
	}
	
	function getPOByRequestId($request) {
		if (isset($request) && $request > 0) {
			$sql = "SELECT v.name as vendor, po.unit_cost, po.quantity, po.unit_cost * po.quantity AS total, po.request, p.name, po.order_date FROM PartOrders AS po JOIN Vendors AS v ON po.vendor_id = v.id JOIN  Parts AS p ON po.part_id = p.id WHERE po.deleted = 0 AND po.id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $request);
			$statement->execute();
			$output = array();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
		}
	}
	
	function removePOById($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE PartOrders SET deleted = 1 WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function removePOByRequest($request) {
		if (isset($request) && $request > 0) {
			$sql = "UPDATE PartOrders SET deleted = 1 WHERE request = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $request);
			$statement->execute();
		}
	}
	
	function getAllPOsAbbreviated() {
		$sql = "SELECT p.id, v.name, p.order_date, sum(p.unit_cost * p.quantity) AS total, p.request, p.ship_date, p.receive_date FROM PartOrders AS p JOIN Vendors AS v ON p.vendor_id = v.id  WHERE p.deleted = 0 AND p.request IS NOT NULL GROUP BY p.request ORDER BY p.order_date DESC";
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