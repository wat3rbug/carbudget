$(document).ready(function() {

	$('#getVendorsBtn').on("click", function() {
		window.location.replace("vendors.html");
	});	
	
	$('#addToolBtn').on("click", function() {
		$('#addToolOrderModal').modal('hide');
		$('#addToolName').val('');
		$('#addToolDescription').val('');
		$('#addToolModal').modal('show');	
	});
	
	$('#noToolsBtn').on("click", function() {
		$('#addToolModal').modal('hide');
		$('#addToolOrderModal').modal('show');	
	});
	
	$('#addToolToDBBtn').on("click", function() {
		addTool();
		$('#addToolModal').modal('hide');
		$('#addToolName').val('');
		$('#addToolDescription').val('');
		$('#addToolOrderModal').modal('show');	
	});
	
	$('#addPOBtn').on("click", function() {
		buildPOStartModal();
	});
	
	$('#addToToolOrderBtn').on("click", function() {
		addLineItem();
	});
	
	$('#completePOBtn').on("click", function() {
		completeToolOrder();
	});

	$('#startPOBtn').on("click", function() {
		buildPOModal();	
	});
	
	$('#addToolDate').datepicker({
		format: 'd-M-yyyy',
		autoclose: true,
		orientation: "top auto",
		todayHighlight: true
	});
});

function completeToolOrder() {
	$.ajax({
		url: "repos/completeToolOrder.php",
		type: "post",
		success: function() {
			$('#addToolOrderModal').modal('hide');
			buildPOTable();
		}
	});
}

function addLineItem() {
	var tool_id = $('#addTool').val();
	var unitcost = $('#addCost').val();
	var quantity = $('#addQuantity').val();
	if (quantity == "") quantity = 1;
	var vendor = $('#addVendor').val();
	var request = $('#addPOTaskIdHdn').val();
	var order_date = getDBDateFromJSDate($('#addToolDate').datepicker('getDate'));
	$.ajax({
		url: "repos/addPartOrder.php",
		type: "post",
		data: {
			"tool": tool_id,
			"unitcost": unitcost,
			"quantity": quantity,
			"vendor": vendor,
			"orderdate": order_date,
			"request": request
		},
		success: function() {
			buildPOModalTable();
		}
	});
}

function buildPOStartModal() {

	$.ajax({
		url: "repos/getAllVendors.php",
		dataType: "json",
		success: function(vendors) {
			$('#selectVendor').empty();
			if (vendors != null && vendors.length > 0) {
				vendors.forEach(function(vendor) {
					$('#selectVendor').append($('<option>').text(vendor.name).val(vendor.id));
				});
				$('#noPOStartModal').modal('show');
			} else {
				$('#addPartOrderVendorModal').modal('show');
			}
		}
	});
}

function buildPOModal() {
	$('#noPOStartModal').modal('hide');
	$('#addToolOrderModal').modal('show');
	$.ajax({
		url: "repos/getAllTools.php",
		dataType: "json",
		success: function(tools) {
			$('#addTool').empty();
			if (tools != null && tools.length > 0) {
				tools.forEach(function(tool){
					$('#addTool').append($('<option>').text(tool.name).val(tool.id));
				});
			}else {
				$('#addTool').append($('<option>').text(' -- No Tools --').val(0));
			}
		}
	});
}

function buildPOModalTable() {
	$.ajax({
		url: "repos/getUnassignedPO.php",
		type: "post",
		dataType: "json",
		success: function(toolorders) {
			$('#orderTable').find('tbody tr').remove();
			if (toolorders != null && toolorders.length > 0) {
				toolorders.forEach(function(toolorder) {
					if (toolorder.name != null) $('#orderTable').append(getToolModalRow(toolorder));	
				});
			} else {
				$('#orderTable').append("<tr><td colspan='5' class='text-center'>No Tools</td></tr>");
			}
		} 
	});
}

function buildPOTable() {
	$.ajax({
		url: "repos/getAllPOsAbbreviated.php",
		type: "post",
		dataType: "json",
		data: {
			"istool": "1"
		},
		success: function(toolorders) {
			$('#poTable').find('tbody tr').remove();
			if (toolorders != null && toolorders.length > 0) {
				toolorders.forEach(function(toolorder) {
					$('#poTable').append(getToolOrderRow(toolorder));	
				});
			} else {
				$('#poTable').append("<tr><td colspan='7' class='text-center'>No Tools</td></tr>");
			}
		}
	});
}

function removePOLineItem(id) {
	$.ajax({
		url: "repos/removePOById.php",
		type: "post",
		data: {
			"id": id
		},
		success: function() {
			buildPOModalTable();
		}
	});
}

function removeCompletePO(id) {
	$.ajax({
		url: "repos/removePOByRequest.php",
		type: "post",
		data: {
			"request": id
		},
		success: function() {
			buildPOTable();
			clearPOModals();
		}
	});
}

function clearPOModals() {
	$('#selectVendor').val('');
}

function getToolModalRow(toolorder) {
	var row = "<tr><td>" + toolorder.part + "</td><td class='text-right'>$" + toolorder.unit_cost + "</td><td>";
	row += toolorder.quantity + "</td><td class='text-right'>$" + toolorder.total + "</td><td class='text-right'>";
	row += "<button type='button' class='btn btn-outline-danger' style='border: none' onclick='removePOLineItem(" + toolorder.id +")'";
	row += " data-toggle='tooltip' title='Remove Part From Order'><span class='glyphicon glyphicon-remove'>";
	row += "</span></button></td></tr>";
	return row;
} 

function getToolOrderRow(toolorder) {
	var row = "<tr><td>" + toolorder.name + "</td><td>" + getWebDateFromDBString(toolorder.order_date);
	row += "</td><td>" + getWebDateFromDBString(toolorder.ship_date) + "</td>";
	row += "<td>" + getTransit(toolorder.ship_date, toolorder.receive_date).toString() + "</td>";
	row += "<td>" + getWebDateFromDBString(toolorder.receive_date) + "</td>";
	row += "<td>$" + toolorder.total + "</td>";
	row += "<td style='width:135px' class='text-right'>";
	row += getPOInfoBtn(toolorder) + "&nbsp;";
	if (toolorder.receive_date == null) {
		row += getPoShippedBtn(toolorder) + "&nbsp;";
		row += getRcvPOBtn(toolorder) + "&nbsp;";
		row += getDelPOBtn(toolorder) + "</td></tr>";
	}
	return row;
}

function getTransit(shipped, received) {
	if (shipped == null) return "not shipped yet";
	if (received == null) received = new Date();
	else received = received.replace(/-/g, '/');
	shipped = shipped.replace(/-/g, '/');
	shipDate = new Date(shipped);
	rcvDate = new Date(received);
	let diff = Math.abs(rcvDate - shipDate) / (1000 * 60 * 60 * 24);
	let days = Math.floor(diff);
	return days; 
}

function getPOInfoBtn(partorder) {
	var btn = "<button type='button' class='btn btn-outline-info' style='border: none' onclick='showPO(" + partorder.id + ")' ";
	btn += "data-toggle='tooltip' title='Get Part Order Details'><span class='glyphicon glyphicon-th-list'></span>";
	btn += "</button>";
	return btn;
}

function getPoShippedBtn(partorder) {
	var btn = "<button type='button' class='btn btn-outline-success' style='border: none' onclick='poShipped(" + partorder.request + ")'";
	btn += " data-toggle='tooltip' title='Part Order Shipped' ";
	if (partorder.ship_date != null) {
		btn += "disabled";
	}
	btn +="><span class='glyphicon glyphicon-plane'></span></button>";
	return btn;
}

function getRcvPOBtn(partorder) {
	var btn = "<button type='button' class='btn btn-outline-success' style='border: none' data-toggle='tooltip'";
	btn += " title='Receive Part Order'";
	btn += " onclick='receivePO(" + partorder.request + ")'><span class='glyphicon glyphicon-inbox'></span>";
	btn += "</button>";
	return btn;
}

function getDelPOBtn(partorder) {
	var btn = "<button type='button' class='btn btn-outline-danger' style='border:none' onclick='removeCompletePO(";
	btn += partorder.request + ")'";
	btn += " data-toggle='tooltip' title='Remove Part Order'>";
	btn += "<span class='glyphicon glyphicon-remove'></span></button>";
	return btn;
}

function addTool() {
	var name = $('#addToolName').val();
	var description = $('#addToolDescription').val();
	$.ajax({
		url: "repos/addTool.php",
		type: "post",
		data: {
			"name": name,
			"description": description
		},
		success: function() {
			$('#addToolModal').modal('hide');
			buildPOModal();
		}
	});
}

function buildVendorList() {
	$.ajax({
		url: "repos/getAllVendors.php",
		type: "post",
		dataType: "json",
		success: function(vendors) {
			if (vendors == null || vendors.length == 0) {
				$('#noVendorModal').modal('show');
			} else {
				$('#addVendor').empty();
				vendors.forEach(function(vendor) {
					$('#addVendor').append($('<option>').text(vendor.name).val(vendor.val));
				});
				$('#addToolOrderVendorModal').modal('show');
			}
		}
	});
}

// function removeToolOrder(id) {
// 	$.ajax({
// 		url: "repos/removePOById.php",
// 		tyep: "post",
// 		data: {
// 			"id": id
// 		},
// 		success: function() {
// 			buildPOTable();
// 		}
// 	});
// }

// function getToolModalRow(toolorder) {
// 	var row = "<tr><td>" + toolorder.name + "</td><td>$" + toolorder.unit_cost + "</td><td>";
// 	row += toolorder.quantity + "</td><td>$" + toolorder.total + "</td><td class='text-right'>";
// 	row += "<button type='button' class='btn btn-outline-danger' style='border: none; padding: 0px' onclick='removePO(" + toolorder.id +")'";
// 	row += " data-toggle='tooltip' title='Remove Tool From Order'><span class='glyphicon glyphicon-remove'>";
// 	row += "</span></button></td></tr>";
// 	return row;
// } 

// function getToolOrderRow(toolorder) {
// 	var row = "<tr><td>" + partorder.name + "</td><td>" + getWebDateFromDBString(partorder.order_date);
// 	row += "</td><td>" + getWebDateFromDBString(partorder.ship_date) + "</td>";
// 	row += "<td>" + getTransit(partorder.ship_date, partorder.receive_date).toString() + "</td>";
// 	row += "<td>" + getWebDateFromDBString(partorder.receive_date) + "</td>";
// 	row += "<td>$" + partorder.total + "</td>";
// 	row += "<td style='width:135px' class='text-right'>";
// 	row += getPOInfoBtn(partorder) + "&nbsp;";
// 	if (partorder.receive_date == null) {
// 		row += getPoShippedBtn(partorder) + "&nbsp;";
// 		row += getRcvPOBtn(partorder) + "&nbsp;";
// 		row += getDelPOBtn(partorder) + "</td></tr>";
// 	}
// 	return row;
// }





// function addTool() {
// 	var name = $('#addToolName').val();
// 	var description = $('#addToolDescription').val();
// 	$.ajax({
// 		url: "repos/addTool.php",
// 		type: "post",
// 		data: {
// 			"name": name,
// 			"description": description,
// 		},
// 		success: function() {
// 			$('#addToolModal').modal('hide');
// 			buildPOModal();
// 		}
// 	});
	
// }

// function addToolOrder(id) {
// 	buildVendorList(id);
// 	$('#addPOTaskIdHdn').val(id);
// }

// function buildVendorList() {
// 	$.ajax({
// 		url: "repos/getAllVendors.php",
// 		type: "post",
// 		dataType: "json",
// 		success: function(vendors) {
// 			if (vendors == null || vendors.length == 0) {
// 				$('#noVendorModal').modal('show');
// 			} else {
// 				$('#addVendor').empty();
// 				vendors.forEach(function(vendor) {
// 					$('#addVendor').append($('<option>').text(vendor.name).val(vendor.val));
// 				});
// 				$('#addToolOrderVendorModal').modal('show');
// 			}
// 		}
// 	});
// }