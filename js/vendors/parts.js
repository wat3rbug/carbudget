$(document).ready(function(){

	makePartsTable();
	
	$('#addPartBtn').on("click", function() {
		$('#addPartModal').modal('show');
	});
	
	$('#pushAddPartToDB').on("click", function() {
		addPart();
	});
	
	$('#pushEditPartToDB').on("click", function() {
		updatePart();	
	});
	
	$('#closePartExistBtn').on("click", function() {
		$('#partExistsModal').modal('hide');
		$('#addPartModal').modal('show');	
	});
});

function filterPartTable() {
	var filter  = $('#filterPart').val();
	if (filter.length < 3) {
		makePartsTable();
	} else {
		$.ajax({
			url: "repos/getFilteredParts.php",
			dataType: "json",
			type: "post",
			data: {
				"filter": filter
			},
			success: function(results) {
				constructTable(results);
			}
		})
	}
}

function constructTable(results) {
	$('#partsTable').find('tbody tr').remove();
	if (results != null && results.length > 0) {
		results.forEach(function(part) {
			$('#partsTable').append(makePartRow(part));
		});
	} else {
		$('#partsTable').append("<tr><td colspan='4' class='text-center'>No parts</td></tr>");
	}
}

function makePartsTable() {
	$.ajax({
		url: "repos/getAllParts.php",
		type: "post",
		dataType: "json",
		success: function(results){
			constructTable(results);
		}
	});	
}

function makePartRow(part) {
	var row = "<tr><td>" + part.name + "</td><td>";
	if (part.part_num != null) {
		row += part.part_num;
	} else {
		row += "--";
	}
	row += "</td><td>" + part.description + "</td><td style='width:75px'><button type='button' ";
	row += "class='btn btn-outline-warning' onclick='editPart(";
	row += part.id + ")'><span class='glyphicon glyphicon-pencil'></span></button>&nbsp;";
	row += "<button class='btn btn-outline-danger' onclick='removePart(" + part.id + ")'>";
	row += "<span class='glyphicon glyphicon-remove'></span></button></td></tr>";
	return row;
}

function editPart(id) {
	$('#editPartModal').modal('show');
	$('#editModalTitle').text('Edit Part');
	$('#pushEditPartToDB').text('Update Part');
	$.ajax({
		url: "repos/getPartById.php",
		data: {
			"id": id
		},
		type: "post",
		success: function(results) {
			results.forEach(function(part) {
				$('#editPartIdHdn').val(part.id);
				$('#editPartName').val(part.name);
				$('#editPartNum').val(part.part_num);
				$('#editPartDescription').val(part.description);
			});
		}	
	});
}

function removePart(id) {
	$.ajax({
		url: "repos/removePartById.php",
		data: {
			"id": id
		},
		type: "post",
		success: function() {
			filterPartTable();
		}
	})
}

function updatePart() {
	var id = $('#editPartIdHdn').val();
	var part = $('#editPartName').val();
	var partnum = $('#editPartNum').val();
	var desc = $('#editPartDescription').val();
	$.ajax({
		url: "repos/updatePartById.php",
		type: "post",
		data: {
			"id": id,
			"description": desc,
			"num": partnum,
			"name": part
		},
		success: function() {
			$('#editPartModal').modal('hide');
			filterPartTable();
			makeToolsTable();
		}
	});
}

function addPart() {
	var part = $('#addPartName').val();
	var partnum = $('#addPartNum').val();
	var desc = $('#addPartDescription').val();
	$.ajax({
		url: "repos/checkPartExists.php",
		type: "post",
		dataType: "json",
		data: {
			"description": desc,
			"partnum": partnum,
			"name": part
		},
		success: function(results) {
			if (Array.isArray(results) && results.length) {
				$('#addPartModal').modal('hide');
				$('#partExistsModal').modal('show');	
			} else {
				$.ajax({
					url: "repos/addPart.php",
					type: "post",
					data: {
						"description": desc,
						"partnum": partnum,
						"name": part
					},
					success: function() {
						$('#addPartModal').modal('hide');
						filterPartTable();
						filterTTable();
					}
				});
			}
		}
	});
}


