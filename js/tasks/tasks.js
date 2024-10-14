$(document).ready(function() {

	buildTaskTable();	
	
	$('#pushTaskToDB').on("click", function() {
		addTaskToDB();	
	});
	
	$('#pushEditTaskToDB').on("click", function() {
		updateTask();
	});
});

function buildTaskTable() {
	var email = sessionStorage['email'];
	var password = sessionStorage['password'];
	$('#tasks').empty();
	$.ajax({
		url: "repos/getUser.php",
		dataType: "json",
		type: "post",
		data: {
			"email": email,
			"password": password
		},
		success: function(results){
			if (results != null && results.length > 0) {
				var user = results[0].id;
				$.ajax({
					url: "repos/getAllProjects.php",
					type: "post",
					dataType: "json",
					data: {
						"id": user
					},
					success: function(projects) {
						$.ajax({
							url: "repos/getAllTasks.php",
							type: "post",
							dataType: "json",
							data: {
								"id": user
							}, 
							success: function(tasks) {
								projects.forEach(function(project) {
									let currentTasks = tasks.filter(x => x.project_id === project.id);
									row = getProjectSection(project);
									currentTasks.forEach(function(task) {
										row += getCardRow(task, project);
									});
									row += addButtonsToProject(project);
									row += "</ul></div></div><br>";
									$('#tasks').append(row);
								});
							}	
						});	
					}
				});
			}
		}
	});
}

function clearModals() {
	$('#addTaskIdHdn').val('');
	$('#addTaskName').val('');
	$('#addTaskDescription').val('');
	
	$('#editTaskIdHdn').val('');
	$('#editTaskName').val('');
	$('#editTaskDescription').val('');
}

function updateTask() {
	var id = $('#editTaskIdHdn').val();
	var name = $('#editTaskName').val();
	var description = $('#editTaskDescription').val();
	$.ajax({
		url: "repos/updateTaskById.php",
		type: "post",
		data: {
			"id": id,
			"name": name,
			"description": description
		},
		success: function() {
			clearModals();
			$('#editTaskModal').modal('hide');
			buildTaskTable();
		}
	})
}

function addTaskToDB() {
	var project = $('#addTaskIdHdn').val();
	var name = $('#addTaskName').val();
	var description = $('#addTaskDescription').val();
	$.ajax({
		url: "repos/addTask.php",
		type: "post",
		data: {
			"id": project,
			"name": name,
			"description": description
		}, 
		success: function() {
			clearModals();
			$('#addTaskModal').modal('hide');
			buildTaskTable();
		}	
	});
}

function removeTask(id) {
	$.ajax({
		url: "repos/removeTask.php",
		type: "post",
		dataType: "json",
		data: {
			type: "post",
			"id": id
		}	
	});
	buildTaskTable();
}

function addTask(project) {
	$('#addTaskIdHdn').val(project);
	$('#addTaskModal').modal('show');
}

function editTask(id) {
	$.ajax({
		url: "repos/getTaskById.php",
		type: "post",
		dataType: "json",
		data: {
			"id": id
		},
		success: function(result) {
			var task = result[0];
			if (task != null) {
				$('#editTaskIdHdn').val(id);
				$('#editTaskName').val(task['name']);
				$('#editTaskDescription').val(task['description']);
				$('#editTaskModal').modal('show');
			}
		}
	});
}
function toggleCollapse(id) {
	var head = "project_" + id;
	var icon = head + "_icon";
	var button = head + "_button";
	$('#' + head).collapse('toggle');
	if ($('#' + icon).hasClass('glyphicon-resize-small')) {
		$('#' + icon).removeClass('glyphicon-resize-small').addClass('glyphicon-resize-full');
		
	} else {
		$('#' + icon).removeClass('glyphicon-resize-full').addClass('glyphicon-resize-small');
		
	}
}
function toggleComplete(task) {
	$.ajax({
		url: "repos/toggleTaskComplete.php",
		type: "post",
		data: {
			"task": task
		},
		success: function() {
			buildTaskTable();
		}
	});
}

function getProjectSection(project) {
	var row = "<div class='card'><div class='card-header'>" + project.name + "&nbsp;<button type='button' ";
	row += "class='btn btn-outline-secondary' onclick='toggleCollapse(" + project.id + ")' ";
	row += "id='project_" + project.id + "_button'>";
	row += "<span class='glyphicon glyphicon-resize-small' id='project_" + project.id + "_icon'></span></button>";
	row += " <button type='button' class='btn btn-link' onclick='getCar(" + project.id + ")'>Car</button> Starting Budget: $";
	row += project.starting_budget + " </div> ";
	row += "<div class='card-body collapse show' id='project_" + project.id + "'><ul class='list-group list-group-flush'>";
	return row;
}

function addButtonsToProject(project) {
	var row = "<li class='list-group-item'><button type='button' class='btn btn-success' onclick='addTask(";
	row += project.id + ")'><span class='glyphicon glyphicon-plus'></span>&nbsp;Add New Task</button></li>";
	return row;
}

function getCardRow(task, project,parts) {
	var row = "<li class='list-group-item'><div class='row'><div class='col-md-9'><div class='form-check'>";
	row += "<input type='checkbox' class='form-check-input' onclick='toggleComplete(" + task.id + ")'>&nbsp;"+ task.name;
	row += "</div></div>";
	row += "<div class='col-md-3 text-right'>";
	row += "<button type='button' class='btn btn-outline-info' tooltip='Get Details' onclick='taskInfo(" + task.id + ")'>";
	row += "<span class='glyphicon glyphicon-zoom-in'></span></button>&nbsp;";
	row += "<button type='button' class='btn btn-outline-warning' tooltip='Edit Task' ";
	row += "onclick='editTask(" + task.id + ")'><span class='glyphicon glyphicon-pencil'></span></button>&nbsp;";
	row += "<button type='button' class='btn btn-outline-danger' tooltip='Remove Task' onclick='removeTask(" + task.id + ")'>";
	row += "<span class='glyphicon glyphicon-remove'></span></button></div></div></li>";
	return row;	
}