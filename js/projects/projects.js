$(document).ready(function() {
	
	$('#addProjectBtn').on("click", function() {
		$('#addProjectModal').modal('show');	
		$.ajax({
			url: "repos/getAllCars.php",
			dataType: "json",
			success: function(results) {
				$('#addProjCar').empty();
				if (results != null) {
					results.forEach(function(car) {
						var row = car.year + " " + car.make + " " + car.model;
						$('#addProjCar').append($('<option>').text(row).val(car.id));
					});
				}
			}	
		});
	});
	
	$('#pushProjectToDB').on("click", function() {
		addProjectToDB();	
	});
	
	$('#pushEditProjectToDB').on("click", function() {
		updateProjectToDB();
	});
	
	$('#addProjStart').datepicker({
		format: 'd-M-yyyy',
		autoclose: true,
		orientation: "top auto",
		todayHighlight: true
	});
	
	$('#addProjEnd').datepicker({
		format: 'd-M-yyyy',
		autoclose: true,
		orientation: "top auto",
		todayHighlight: true
	});
	
	$('#editProjStart').datepicker({
		format: 'd-M-yyyy',
		autoclose: true,
		orientation: "top auto",
		todayHighlight: true
	});
	
	$('#editProjEnd').datepicker({
		format: 'd-M-yyyy',
		autoclose: true,
		orientation: "top auto",
		todayHighlight: true
	});

	buildProjectTable();
});

function clearModals() {
	// add project
	$('#addProjCar').val('');
	$('#addProjName').val('');
	$('#addProjDescription').val('');
	$('#addProjBudget').val('');
	
	$('#editProjCar').val('');
	$('#editProjIdHdn').val('');
	$('#editProjName').val('');
	$('#editProjDescription').val('');
	$('#editProjBudget').val(''); 
}

function updateProjectToDB() {
	var car_id = $('#editProjCar').val();
	var name = $('#editProjName').val();
	var description = $('#editProjDescription').val();
	var budget = $('#editProjBudget').val();
	var start_date = getDBDateFromJSDate($('#editProjStart').datepicker('getDate'));
	var end_date = getDBDateFromJSDate($('#editProjEnd').datepicker('getDate'));
	var id = $('#editProjIdHdn').val();
	$.ajax({
		url: "repos/updateProjectById.php",
		type: "post",
		data: {
			"id": id,
			"name": name,
			"description": description,
			"budget": budget,
			"start_date": start_date,
			"end_date": end_date,
			"car_id": car_id
		}, success: function() {
			$('#editProjectModal').modal('hide');
			buildProjectTable();
			clearModals();
		}
	});
}

function addProjectToDB() {
	var car_id = $('#addProjCar').val();
	var name = $('#addProjName').val();
	var description = $('#addProjDescription').val();
	var budget = $('#addProjBudget').val();
	var start_date = getDBDateFromJSDate($('#addProjStart').datepicker('getDate'));
	var end_date = getDBDateFromJSDate($('#addProjEnd').datepicker('getDate'));
	var password = sessionStorage['password'];
	var email = sessionStorage['email'];
	$.ajax({
		url: "repos/getUser.php",
		type: "post",
		dataType: "json",
		data: {
			"email": email,
			"password": password
		},
		success: function(results) {
			var user = results[0]['id'];
			$.ajax({
				url: "repos/addProject.php",
				type: "post",
				data: {
					"user": user,
					"car_id": car_id,
					"name": name,
					"description": description,
					"budget": budget,
					"start_date": start_date,
					"end_date": end_date
				},
				success: function() {
					$('#addProjectModal').modal('hide');
					buildProjectTable();
					clearModals();
				}
			});
		}
	});
	
}

function getWebStrFromDB(currentDate) {
	var sections = currentDate.split("-");
	var year = sections[0];
	var day = sections[2];
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var month = months[sections[1] -1];
	return day + "-" + month + "-" + year;
		
}

function buildProjectTable() {
	var password = sessionStorage['password'];
	var email = sessionStorage['email'];
	$.ajax({
		url: "repos/getUser.php",
		type: "post",
		dataType: "json",
		data: {
			"email": email,
			"password": password
		},
		success: function(results) {
			var user = results[0]['id'];
			$.ajax({
				url: "repos/getAllProjects.php",
				dataType: "json",
				type: "post",
				data: {
					"id": user
				},
				success: function(projects) {
					$.ajax({
						url: "repos/getAllTags.php",
						dataType: "json",
						success: function(tags) {
							if (projects == null || projects.length == 0) {
								$('#projectsTable').find('tbody tr').remove();
								$('#projectsTable').append("<tr><td colspan='7' class='text-center'>No Data</td></tr>");
							} else {
								$('#projectsTable').find('tbody tr').remove();
								projects.forEach(function(project) {
									var row = "<tr><td>" + project.name + "</td>";
									row += "<td>" + project.description + "</td>";
									let currentTags = tags.filter(x => x.project_id == project.id);
									if (currentTags == null || currentTags.length == 0) {
										row += "<td>&nbsp;</td>";
									} else {
										row += "<td>" + addTagsForProject(currentTags) + "</td>";
									}			
									row += "<td>" + getWebStrFromDB(project.start_date) + "</td>";
									row += "<td>" + getWebStrFromDB(project.end_date) + "</td>";
									row += "<td></td>"; // this is car photo section to be implemented later
									row += "<td style='width:115px'><button type='button' class='btn btn-outline-success' onclick='addTag(" + project.id + ")'>";
									row += "<span class='glyphicon glyphicon-plus'></span><span class='glyphicon glyphicon-tag'></span>";
									row += "</button>&nbsp;<button type='button' class='btn btn-outline-warning' ";
									row += "onclick='editProject(" + project.id + ")'>";
									row += "<span class='glyphicon glyphicon-pencil'></span></button>&nbsp;";
									row += "<button type='button' class='btn btn-outline-danger' ";
									row += "onclick='removeProject(" + project.id + ")'>";
									row += "<span class='glyphicon glyphicon-remove'></span></button></td></tr>";
									$('#projectsTable').append(row);
								});
							}
						}	
					});	
				}
			});
		}
	});
}

function addTagsForProject(tags) {
	var row = "";
	tags.forEach(function(tag) {
		row += "<button class='btn btn-outline-info' onclick='removeTag(";
		row += tag.id + ")'>" + tag.sa_name;
		row += "&nbsp;<span class='glyphicon glyphicon-remove'></span>";
		row += "</button>&nbsp;";
	});
	return row;
}

function removeProject(id) {
	$.ajax({
		url: "repos/removeProjectById.php",
		type: "post",
		data: {
			"id": id
		},
		success: function() {
			buildProjectTable();
		}
	});
}

function editProject(id) {
	$.ajax({
		url: "repos/getProjectById.php",
		dataType: "json",
		type: "post",
		data: {
			"id": id
		},
		success: function(results) {
			if (results != null) {
				var project = results[0];
				$('#editProjectModal').modal('show');
				$('#editProjIdHdn').val(id);
				$('#editProjName').val(project['name']);
				$('#editProjDescription').val(project['description']);
				$('#editProjEnd').datepicker("setDate", getDateFromDBString(project['end_date']));
				$('#editProjStart').datepicker("setDate", getDateFromDBString(project['start_date'])); 
				$('#editProjBudget').val(project['starting_budget']); 
				$.ajax({
					url: "repos/getAllCars.php",
					dataType: "json",
					success: function(cars) {
						$('#editProjCar').empty();
						cars.forEach(function(car) {
							var row = car.year + " " + car.make + " " + car.model;
							$('#editProjCar').append($('<option>').text(row).val(car.id));
						});
						$('#editProjCar').val(project.car_id);
					}
				});
			}
		}
	});
}