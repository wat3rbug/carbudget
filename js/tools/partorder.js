$(document).ready(function() {

	$('#getVendorsBtn').on("click", function() {
		window.location.replace("vendors.html");
	});	
	
	$('#addPartBtn').on("click", function() {
		$('#addPartOrderModal').modal('hide');
		$('#addPartName').val('');
		$('#addPartDescription').val('');
		$('#addPartModal').modal('show');	
	});
	
	$('#noPartsBtn').on("click", function() {
		$('#addPartModal').modal('hide');
		$('#addPartOrderModal').modal('show');	
	});
	
	$('#addPartToDBBtn').on("click", function() {
		addTool();
		$('#addPartModal').modal('hide');
		$('#addPartName').val('');
		$('#addPartDescription').val('');
		$('#addPartOrderModal').modal('show');	
	});
	
	$('#addPOBtn').on("click", function() {
		buildPOModal();
	});
	
	$('#addToPartOrderBtn').on("click", function() {
		addLineItem();
	});
	
	$('#completePOBtn').on("click", function() {
		completePartOrder();
	});
});

function completePartOrder() {
	$.ajax({
		url: "repos/completePartOrder.php",
		type: "post",
		success: function() {
			$('#addPartOrderModal').modal('hide');
			buildPOTable();
		}
	});
}

function addLineItem() {
	var part_id = $('#addTool').val();
	var unitcost = $('#addCost').val();
	var quantity = $('#addQuantity').val();
	if (quantity == "") quantity = 1;
	var vendor = $('#addVendor').val();
	var order_date = getDBDateFromJSDate($('#addPartDate').datepicker('getDate'));
	$.ajax({
		url: "repos/addToolOrder.php",
		type: "post",
		data: {
			"part": part_id,
			"unitcost": unitcost,
			"quantity": quantity,
			"vendor": vendor,
			"orderdate": order_date
		},
		success: function() {
			buildPOModal();
		}
	});
}

function buildPOModal() {
	$.ajax({
		url: "repos/getAllTools.php",
		dataType: "json",
		success: function(parts) {
			$('#addTool').empty();
			if (parts != null && parts.length > 0) {
				parts.forEach(function(part){
					$('#addTool').append($('<option>').text(part.name).val(part.id));
				});
			}else {
				$('#addTool').append($('<option>').text(' -- No Parts --').val(0));
			}
			$.ajax({
				url: "repos/getAllVendors.php",
				dataType: "json",
				success: function(vendors) {
					$('#addVendor').empty();
					if (vendors != null && vendors.length > 0) {
						vendors.forEach(function(vendor) {
							$('#addVendor').append($('<option>').text(vendor.name).val(vendor.id));	
						});
						$('#addPartOrderModal').modal('show');
						buildPOModalTable();
					} else {
						$('#addPartOrderVendorModal').modal('show');
					}
				}
			});	
		}
	});
}

function buildPOModalTable() {
	$.ajax({
		url: "repos/getUnassignedPO.php",
		type: "post",
		dataType: "json",
		success: function(partorders) {
			$('#orderTable').find('tbody tr').remove();
			if (partorders != null && partorders.length > 0) {
				partorders.forEach(function(partorder) {
					if (partorder.name != null) $('#orderTable').append(getPartModalRow(partorder));	
				});
			} else {
				$('#orderTable').append("<tr><td colspan='5' class='text-center'>No Parts</td></tr>");
			}
		} 
	});
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

function removePartOrder(id) {
	$.ajax({
		url: "repos/removePOById.php",
		tyep: "post",
		data: {
			"id": id
		},
		success: function() {
			buildPOTable();
		}
	});
}

function getPartModalRow(partorder) {
	var row = "<tr><td>" + partorder.name + "</td><td>$" + partorder.unit_cost + "</td><td>";
	row += partorder.quantity + "</td><td>$" + partorder.total + "</td><td class='text-right'>";
	row += "<button type='button' class='btn btn-outline-danger' onclick='removePO(" + partorder.id +")'";
	row += " data-toggle='tooltip' title='Remove Part From Order'><span class='glyphicon glyphicon-remove'>";
	row += "</span></button></td></tr>";
	return row;
} 

function getPartOrderRow(partorder) {
	var row = "<tr><td>" + partorder.name + "</td><td>" + getWebDateFromDBString(partorder.order_date);
	row += "</td><td>$";
	row += partorder.total + "</td><td style='width:135px' class='text-right'>";
	row += "<button type='button' class='btn btn-outline-info' onclick='showPO(" + partorder.request + ")' ";
	row += "data-toggle='tooltip' title='Get Part Order Details'><span class='glyphicon glyphicon-th-list'></span>";
	row += "</button>&nbsp;";
	if (partorder.receive_date == null) {
		row += "<button type='button' class='btn btn-outline-success' onclick='poShipped(" + partorder.request + ")'";
		row += " data-toggle='tooltip' title='Part Order Shipped' ";
		if (partorder.ship_date != null) {
			row += "disabled";
		}
		row +="><span class='glyphicon glyphicon-plane'></span></button>&nbsp;";
		row += "<button type='button' class='btn btn-outline-success data-toggle='tooltip' title='Receive Part Order'";
		row += " onclick='receivePO(" + partorder.request + ")'><span class='glyphicon glyphicon-share-alt'></span>";
		row += "</button>&nbsp;";
		row += "<button type='button' class='btn btn-outline-danger' onclick='removePO(" + partorder.quest + ")'";
		row += " data-toggle='tooltip' title='Remove Part Order'>";
		row += "<span class='glyphicon glyphicon-remove'></span></button></td></tr>";
	}
	return row;
}

function addTool() {
	var name = $('#addPartName').val();
	var description = $('#addPartDescription').val();
	car cost = 
	$.ajax({
		url: "repos/addTool.php",
		type: "post",
		data: {
			"name": name,
			"description": description,
			"cost": cost
		},
		success: function() {
			$('#addPartModal').modal('hide');
			buildPOModal();
		}
	});
	
}

function addPartOrder(id) {
	buildVendorList(id);
	$('#addPOTaskIdHdn').val(id);
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
				$('#addPartOrderVendorModal').modal('show');
			}
		}
	});
}