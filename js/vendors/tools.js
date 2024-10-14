$(document).ready(function(){

	makeToolsTable();
	
	$('#addToolBtn').on("click", function() {
		$('#addToolModal').modal('show');
	});
	
	$('#pushAddToolToDB').on("click", function() {
		addTool();	
	});
	
	$('#closeToolExistBtn').on("click", function() {
		$('#toolExistsModal').modal('hide');
		$('#addToolModal').modal('show');
	});
	
});

function constructTTable(results) {
	$('#toolsTable').find('tbody tr').remove();
	if (results != null && results.length > 0) {
		results.forEach(function(tool) {
			$('#toolsTable').append(makeToolRow(tool));
		});
	} else {
		$('#toolsTable').append("<tr><td colspan='3' class='text-center'>No Tools</td></tr>");
	}
}

function filterTTable() {
	var filter = $('#filterTool').val();
	if (filter.length < 3) {
		makeToolsTable();
	} else {
		$.ajax({
			url: "repos/getFilteredTools.php",
			dataType: "json",
			type: "post",
			data: {
				"filter": filter
			},
			success: function(results) {
				constructTTable(results);
			}
		})
	}
}

function makeToolsTable() {
	$.ajax({
		url: "repos/getAllTools.php",
		type: "post",
		dataType: "json",
		success: function(results){
			constructTTable(results);
		}
	});
}

function makeToolRow(tool) {
	var row = "<tr><td>" + tool.name + "</td>";
	row += "<td>" + tool.description + "</td><td style='width:75px'><button type='button' ";
	row += "class='btn btn-outline-warning' onclick='editTool(";
	row += tool.id + ")'><span class='glyphicon glyphicon-pencil'></span></button>&nbsp;";
	row += "<button class='btn btn-outline-danger' onclick='removeTool(" + tool.id + ")'>";
	row += "<span class='glyphicon glyphicon-remove'></span></button></td></tr>";
	return row;
}

function editTool(id) {
	$('#editPartModal').modal('show');
	$('#editModalTitle').text('Edit Tool');
	$('#pushEditPartToDB').text('Update Tool');
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

function removeTool(id) {
	$.ajax({
		url: "repos/removePartById.php",
		data: {
			"id": id
		},
		type: "post",
		success: function() {
			makeToolsTable();
		}
	})
}

function addTool() {
	var part = $('#addToolName').val();
	var desc = $('#addToolDescription').val();
	$.ajax({
		url: "repos/checkToolExists.php",
		type: "post",
		dataType: "json",
		data: {
			"description": desc,
			"name": part
		},
		success: function(results) {
			if (Array.isArray(results) && results.length) {
				$('#addToolModal').modal('hide');
				$('#toolExistsModal').modal('show');	
			} else {
				$.ajax({
					url: "repos/addTool.php",
					type: "post",
					data: {
						"description": desc,
						"name": part
					},
					success: function() {
						$('#addToolModal').modal('hide');
						filterPartTable();
						filterTTable();
					}
				});
			}
		}
	});
}



