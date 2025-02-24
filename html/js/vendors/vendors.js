$(document).ready(function() {
	
	buildVendorTable();
	getStateSelectorInfo();
	
	$('#addVendorBtn').on("click", function() {
		$('#addVendorModal').modal('show');	
	});
	
	$('#pushVendorToDB').on("click", function() {
		pushVendorToDB();
	});
	
	$('#pushEditVendorToDB').on("click", function() {
		pushEditVendorToDB();
	});
	
	$('#addOnlyOnline').on("click", function() {
		$('#onlineOnlyPortion').collapse('toggle');
	});
});

function getStateSelectorInfo() {
	$.ajax({
		url: "repos/getAllStates.php",
		dataType: "json",
		success: function(states) {
			var selectors = [$("#addState"), $("#editState")];
			selectors.forEach(function(selector) {
				$(selector).empty();
				$(selector).append($('<option>').text(" -- NA --").val("NA"));
				states.forEach(function(state) {
					$(selector).append($('<option>').text(state.state).val(state.postal_code));
				});
				$(selector).val("NA");
			});	
		}
	});
}

function editVendor(id) {
	$.ajax({
		url: "repos/getVendorById.php",
		type: "post",
		dataType: "json",
		data: {
			"id": id
		},
		success: function(results) {
			var vendor = results[0];
			$('#editVendorIdHdn').val(vendor.id);
			$('#editName').val(vendor.name);
			$('#editURL').val(vendor.url);
			$('#editAddress1').val(vendor.address1);
			$('#editAddress2').val(vendor.address2);
			$('#editCity').val(vendor.city);
			if (vendor.state == null || vendor.state == "") $('#editState').val("NA");
			else $('#editState').val(vendor.state);
			$('#editCountry').val(vendor.country);
			if (vendor.zipcode != "0") $('#editZipcode').val(vendor.zipcode);
			$('#editVendorModal').modal('show');
		}
	});
}

function removeVendor(id) {
	$.ajax({
		url: "repos/removeVendorById.php",
		type: "post",
		data: {
			"id": id
		},
		success: function() {
			buildVendorTable();
		}
	})
}

function clearModals() {
	$('#addName').val('');
	$('#addURL').val('');
	$('#addAddress1').val('');
	$('#addAddress2').val('');
	$('#addCity').val('');
	$('#addState').val('NA');
	$('#addCountry').val('');
	$('#addZipcode').val('');
	
	$('#editVendorIdHdn').val('');
	$('#editName').val('');
	$('#editURL').val('');
	$('#editAddress1').val('');
	$('#editAddress2').val('');
	$('#editCity').val('');
	$('#editState').val('NA');
	$('#editCountry').val('');
	$('#editZipcode').val('');
}

function pushVendorToDB() {
	var name = $('#addName').val();
	var url = $('#addURL').val();
	var address1 = $('#addAddress1').val();
	var address2 = $('#addAddress2').val();
	var city = $('#addCity').val();
	var state = null;
	if ($('#addState').val() != "NA") state = $('#addState').val();
	var country = $('#addCountry').val();
	var zipcode = $('#addZipcode').val();
	$.ajax({
		url: "repos/addVendor.php",
		type: "post",
		data: {
			"name": name,
			"url": url,
			"address1": address1,
			"address2": address2,
			"city": city,
			"state": state,
			"country": country,
			"zipcode": zipcode
		},
		success: function() {
			clearModals();
			$('#addVendorModal').modal('hide');
			buildVendorTable();
		}
	});
}

function pushEditVendorToDB() {
	var id = $('#editVendorIdHdn').val();
	var name = $('#editName').val();
	var url = $('#editURL').val();
	var address1 = $('#editAddress1').val();
	var address2 = $('#editAddress2').val();
	var city = $('#editCity').val();
	var state = null;
	if ($('#editState').val() != "NA") state = $('#editState').val();
	var country = $('#editCountry').val();
	var zipcode = $('#editZipcode').val();
	$.ajax({
		url: "repos/updateVendorById.php",
		type: "post",
		data: {
			"id": id,
			"name": name,
			"url": url,
			"address1": address1,
			"address2": address2,
			"city": city,
			"state": state,
			"country": country,
			"zipcode": zipcode
		},
		success: function() {
			clearModals();
			$('#editVendorModal').modal('hide');
			buildVendorTable();
		}
	});
}

function filterVendors() {
	var filter = $('#filterVendor').val();
	if (filter.length < 3) {
		buildVendorTable();
	} else {
		$.ajax({
			url: "repos/getFilteredVendors.php",
			type: "post",
			dataType: "json",
			data: {
				"filter" : filter
			},
			success: function(results) {
				constructVTable(results);
			}
		});
	}
}

function constructVTable(vendors) {
	$('#vendorsTable').empty();
	if (vendors != null && vendors.length > 0) {				
		vendors.forEach(function(vendor) {
			var row = getRowCardForVendor(vendor);
			$('#vendorsTable').append(row);
		});
	} else {
		var row = "<div class='text-center'>No Vendors</div>";
		$('#vendorsTable').append(row);
	}
}

function buildVendorTable() {
	$.ajax({
		url: "repos/getAllVendors.php",
		dataType: "json",
		success: function(vendors) {
			constructVTable(vendors);
		}
	});
}

function getRowCardForVendor(vendor) {
	var row = "<div class='card'><div class='card-header'><div class='row'><div class='col-sm-8'>" + vendor.name + "</div>";
	row += "<div class='col-sm-4 tex-right'><button type='button' class='btn btn-outline-warning' onclick='editVendor(";
	row += vendor.id + ")'><span class='glyphicon glyphicon-pencil'></span></button>&nbsp;<button type='button' ";
	row += "class='btn btn-outline-danger' onclick='removeVendor(" + vendor.id + ")'><span class='glyphicon ";
	row += "glyphicon-remove'></span></button></div></div></div>";
	row += "<dir class='card-body'><div class='card-title'>URL <a href='" + vendor.url + "'>" + vendor.url + "</a></div>";
	row += "<div class='card-text'>";
	if (vendor.address1 != "") {
		row += "<b>Address</b> " + vendor.address1 + "<br>" + vendor.address2 + "<br>";
		row += "<b>City</b> " + vendor.city + "<br><b>State</b> ";
		if (vendor.state == "" || vendor.state == "NA") row += "N/A";
		else row += vendor.state;
		if (vendor.zipcode != "0") {
			row += ", " + vendor.zipcode;
		}
		row += "<br><b>Country</b> ";
		if (vendor.country == "") row += "N/A<br>";
		else vendor.country + "<br>";
	}
	row += "</div></div></div><br>";
	return row;
}