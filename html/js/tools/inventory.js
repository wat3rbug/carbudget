$(document).ready(function() {
	
	buildStockTable();
	buildPOTable();
	
	$('#pushInventoryToDB').on("click", function() {
		$.ajax({
			url: "repos/updateStockById.php",
			type: "post",
			data: {
				"tool": $('#pushInventoryToDB').val(),
				"quantity": $('#editQuantity').val(),
				"location": $('#editLocation').val()
			},
			success: function() {
				$('#editStockModal').modal('hide');
				buildStockTable();
			}
		});	
	});
	
	$('#addtoolDate').datepicker({
		format: 'd-M-yyyy',
		autoclose: true,
		orientation: "top auto",
		todayHighlight: true
	});
});

// remove a tool order from the list

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

// do update for receiving a tool order

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

// do update for when a tool order gets shipped

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
		success: function(toolorders) {
			$('#infoVendor').empty();
			$('#infoOrderDate').empty();
			$('#infoVendor').append(toolorders[0]['vendor']);
			$('#infoOrderDate').append(getWebDateFromDBString(toolorders[0]['order_date']));
			$('#poInfoTable').find('tbody tr').remove();
			if (toolorders != null && toolorders.length > 0) {
				toolorders.forEach(function(toolorder) {
					var row = "<tr><td>" +	toolorder.name + "</td><td class='text-right'>$" + toolorder.unit_cost;
					row += "</td><td class='text-right'>" + toolorder.quantity + "</td><td class='text-right'>$";
					row += toolorder.total + "</td></tr>";
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
		success: function(tools) {
			$('#inventoryTable').find('tbody tr').remove();
			if(tools != null && tools.length > 0) {			
				tools.forEach(function(tool) {
					var row = getToolRow(tool);
					$('#inventoryTable').append(row);	
				});
			} else {
				var row = "<tr><td colspan='4' class='text-center'>No Tools in Stock</td></tr>";
				$('#inventoryTable').append(row);
			}
		}
	});
}

// helper function for the inventory table

function getToolRow(tool) {
	var row = "<tr><td>" + tool.name + "</td><td>" + tool.quantity + "</td><td>";
	if (tool.location != null) row += tool.location;
	row += "</td><td style='width: 85px'><button type='button' class='btn btn-outline-warning' onclick='editStock(" + tool.id + ")'>";
	row += "<span class='glyphicon glyphicon-pencil'></span></button>";
	row += "&nbsp;<button type='button' class='btn btn-outline-danger' onclick='removeStock(" + tool.id + ")'>";
	row += "<span class='glyphicon glyphicon-remove'></span></button>"
	row += "</td></tr>";
	return row;
}

// remove a tool from inventory?

function removeStock(tool) {
	$.ajax({
		url: "repos/removeStock.php",
		type: "post",
		data: {
			"tool": tool
		},
		success: function() {
			buildStockTable();
		}
	});
}

// edit the inventory

function editStock(tool) {
	$.ajax({
		url: "repos/getToolStockById.php",
		dataType: "json",
		type: "post",
		data: {
			"tool": tool
		},
		success: function(tools) {
			if (tools != null && tools.length > 0) {
				tools.forEach(function(tool) {
					$('#editTool').empty();
					$('#editTool').text(tool['name']);
					$('#editQuantity').val(tool['quantity']);
					$('#editLocation').val(tool['location']);
					$('#pushInventoryToDB').val(tool['id']);	
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
		success: function(toolorders) {
			$('#poTable').find('tbody tr').remove();
			if (toolorders != null && toolorders.length > 0) {
				toolorders.forEach(function(toolorder) {
					$('#poTable').append(getToolOrderRow(toolorder));	
				});
			} else {
				$('#poTable').append("<tr><td colspan='5' class='text-center'>No Tools</td></tr>");
			}
		}
	});
}


// function getToolRow(tool) {
// 	var row = "<tr><td>" + tool.name + "</td><td>" + tool.quantity + "</td><td>";
// 	if (tool.location != null) row += tool.location;
// 	row += "</td><td style='width:85px'><button type='button' class='btn btn-outline-warning' onclick='editStock(" + tool.id + ")'>";
// 	row += "<span class='glyphicon glyphicon-pencil'></span></button>";
// 	row += "&nbsp;<button type='button' class='btn btn-outline-danger' onclick='removeStock(" + tool.id + ")'>";
// 	row += "<span class='glyphicon glyphicon-remove'></span></button>"
// 	row += "</td></tr>";
// 	return row;
// }

// function removeStock(tool) {
// 	$.ajax({
// 		url: "repos/removeStock.php",
// 		type: "post",
// 		data: {
// 			"tool": tool
// 		},
// 		success: function() {
// 			buildStockTable();
// 		}
// 	});
// }