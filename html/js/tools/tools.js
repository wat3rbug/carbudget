$(document).ready(function() {
	
	buildStockTable();
	//buildPOTable();
	
	$('#pushInventoryToDB').on("click", function() {
		$.ajax({
			url: "repos/updateStockById.php",
			type: "post",
			data: {
				"part": $('#pushInventoryToDB').val(),
				"quantity": $('#editQuantity').val(),
				"location": $('#editLocation').val()
			},
			success: function() {
				$('#editStockModal').modal('hide');
				buildStockTable();
			}
		});	
	});
	
	$('#addPartDate').datepicker({
		format: 'd-M-yyyy',
		autoclose: true,
		orientation: "top auto",
		todayHighlight: true
	});
});

// remove a part order from the list

function removePO(request) {
	$.ajax({
		url: "repos/removePOById.php",
		type: "post",
		data: {
			"request": request
		},
		success: function() {
			buildPOTable();
		}
	});
}

// do update for receiving a part order

function receivePO(request) {
	$.ajax({
		url: "repos/POReceived.php",
		type: "post",
		data: {
			"request": request
		},
		success: function() {
			buildPOTable();
			buildStockTable();	
		}
	});
}

// do update for when a part order gets shipped

function poShipped(request) {
	$.ajax({
		url: "repos/POShipped.php",
		type: "post",
		data: {
			"request": request
		},
		success: function() {
			buildPOTable();
		}
	});
}
// ?

function showPO(request) {
	$('#showPOModal').modal('show');
	$.ajax({
		url: "repos/getPOByRequestId.php",
		type: "post",
		dataType: "json",
		data:{
			"request": request
		},
		success: function(partorders) {
			$('#infoVendor').empty();
			$('#infoOrderDate').empty();
			$('#infoVendor').append(partorders[0]['vendor']);
			$('#infoOrderDate').append(getWebDateFromDBString(partorders[0]['order_date']));
			$('#poInfoTable').find('tbody tr').remove();
			if (partorders != null && partorders.length > 0) {
				partorders.forEach(function(partorder) {
					var row = "<tr><td>" +	partorder.name + "</td><td class='text-right'>$" + partorder.unit_cost;
					row += "</td><td class='text-right'>" + partorder.quantity + "</td><td class='text-right'>$";
					row += partorder.total + "</td></tr>";
					$('#poInfoTable').append(row);
				});
			} else {
				var row = "<tr><td colspan='4' class='text-center'>No Details</td></tr>";
				$('#poInfoTable').append(row);
			}
		}
	});
}
// make the inventory table

function buildStockTable() {
	$.ajax({
		url: "repos/getToolStock.php",
		dataType: "json",
		success: function(parts) {
			$('#inventoryTable').find('tbody tr').remove();
			if(parts != null && parts.length > 0) {			
				parts.forEach(function(part) {
					var row = getPartRow(part);
					$('#inventoryTable').append(row);	
				});
			} else {
				var row = "<tr><td colspan='4' class='text-center'>No Parts in Stock</td></tr>";
				$('#inventoryTable').append(row);
			}
		}
	});
}

// helper function for the inventory table

function getPartRow(part) {
	var row = "<tr><td>" + part.name + "</td><td>" + part.quantity + "</td><td>";
	if (part.location != null) row += part.location;
	row += "</td><td style='width: 85px'><button type='button' class='btn btn-outline-warning' onclick='editStock(" + part.id + ")'>";
	row += "<span class='glyphicon glyphicon-pencil'></span></button>";
	row += "&nbsp;<button type='button' class='btn btn-outline-danger' onclick='removeStock(" + part.id + ")'>";
	row += "<span class='glyphicon glyphicon-remove'></span></button>"
	row += "</td></tr>";
	return row;
}

// remove a tool from inventory?

function removeStock(part) {
	$.ajax({
		url: "repos/removeStock.php",
		type: "post",
		data: {
			"part": part
		},
		success: function() {
			buildStockTable();
		}
	});
}

// edit the inventory

function editStock(part) {
	$.ajax({
		url: "repos/getToolStockById.php",
		dataType: "json",
		type: "post",
		data: {
			"part": part
		},
		success: function(tools) {
			if (tools != null && tools.length > 0) {
				tools.forEach(function(part) {
					$('#editPart').empty();
					$('#editPart').text(part['name']);
					$('#editQuantity').val(part['quantity']);
					$('#editLocation').val(part['location']);
					$('#pushInventoryToDB').val(part['id']);	
				});
				$('#editStockModal').modal('show');
			}
		}
	})
}

function buildPOTable() {
	$.ajax({
		url: "repos/getAllPOsAbbreviated.php",
		type: "post",
		dataType: "json",
		success: function(partorders) {
			$('#poTable').find('tbody tr').remove();
			if (partorders != null && partorders.length > 0) {
				partorders.forEach(function(partorder) {
					$('#poTable').append(getPartOrderRow(partorder));	
				});
			} else {
				$('#poTable').append("<tr><td colspan='5' class='text-center'>No Parts</td></tr>");
			}
		}
	});
}


// function getPartRow(part) {
// 	var row = "<tr><td>" + part.name + "</td><td>" + part.quantity + "</td><td>";
// 	if (part.location != null) row += part.location;
// 	row += "</td><td style='width:85px'><button type='button' class='btn btn-outline-warning' onclick='editStock(" + part.id + ")'>";
// 	row += "<span class='glyphicon glyphicon-pencil'></span></button>";
// 	row += "&nbsp;<button type='button' class='btn btn-outline-danger' onclick='removeStock(" + part.id + ")'>";
// 	row += "<span class='glyphicon glyphicon-remove'></span></button>"
// 	row += "</td></tr>";
// 	return row;
// }

// function removeStock(part) {
// 	$.ajax({
// 		url: "repos/removeStock.php",
// 		type: "post",
// 		data: {
// 			"part": part
// 		},
// 		success: function() {
// 			buildStockTable();
// 		}
// 	});
// }