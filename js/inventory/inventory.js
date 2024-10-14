$(document).ready(function() {
	
	buildStockTable();
	buildPOTable();
	
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
});

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
	})
}

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

function buildStockTable() {
	$.ajax({
		url: "repos/getStock.php",
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

function getPartRow(part) {
	var row = "<tr><td>" + part.name + "</td><td>" + part.quantity + "</td><td>";
	if (part.location != null) row += part.location;
	row += "</td><td style='width:85px'><button type='button' class='btn btn-outline-warning' onclick='editStock(" + part.id + ")'>";
	row += "<span class='glyphicon glyphicon-pencil'></span></button>";
	row += "&nbsp;<button type='button' class='btn btn-outline-danger' onclick='removeStock(" + part.id + ")'>";
	row += "<span class='glyphicon glyphicon-remove'></span></button>"
	row += "</td></tr>";
	return row;
}

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

function editStock(part) {
	$.ajax({
		url: "repos/getStockById.php",
		type: "post",
		dataType: "json",
		data: {
			"part": part
		},
		success: function(parts) {
			if (parts != null && parts.length > 0) {
				parts.forEach(function(part) {
					$('#editPart').empty();
					$('#editPart').text(part['name']);
					$('#editQuantity').val(part['quantity']);
					$('#editLocation').val(part['location']);
					$('#pushInventoryToDB').val(part['id']);	
				});
				$('#editStockModal').modal('show');
			}
		}
	});
}