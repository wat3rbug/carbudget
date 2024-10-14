$(document).ready(function() {
	
	$('#addCarBtn').on('click', function() {
		clearModals();
		$('#addCarModal').modal('show');	
	});
	
	$('#pushCarToDB').on('click', function() {
		addCarToDB();	
	});
	
	$('#pushEditCarToDB').on("click", function() {
		var id = $('#editCarIdHdn').val();
		updateCar(id);
	});
	
	$('#addPhoto').on("change", function() {
		var fileName = $(this).val().split("\\").pop();
		$(this).siblings(".custom-file-label").addClass("selected").html(fileName);	
	});
	
	buildCarTable();
});

function clearModals() {
	// add car stuff
	$('#addMake').val('');
	$('#addModel').val('');
	$("#addColor").val('');
	$('#addYear').val('');
	// edit car stuff
	$('#editMake').val('');
	$('#editModel').val('');
	$('#editColor').val('');
	$('#edtiYear').val('');
}

function addCarToDB() {
	var make = $('#addMake').val();
	var model = $('#addModel').val();
	var color = $("#addColor").val();
	var year = $('#addYear').val();
	$.ajax({
		url: "repos/addCar.php",
		type: "post",
		data: {
			"make": make,
			"model": model,
			"color": color,
			"year": year
		},
		success: function() {
			$('#addCarModal').modal('hide');
			buildCarTable();
		}
	});
}

function buildCarTable() {
	$.ajax({
		url: "repos/getAllCars.php",
		type: "get",
		dataType: "json",
		success: function(cars) {
			$('#carsTable').find('tbody tr').remove();
			if (cars == null || cars.length == 0) {
				$('#carsTable').append("<tr><td colspan='5' class='text-center'>No Data</td></tr>");
			} else {
				cars.forEach(function(car) {
					var row = "<tr><td>" + car.make + "</td><td>" + car.model + "</td>";
					row += "<td>" + car.color + "</td><td>" + car.year + "</td>";
					row += "<td style='width:105px'><button type='button' class='btn btn-outline-warning' ";
					row += "onclick='editPicture(" + car.id + ")'><span class='glyphicon glyphicon-picture'></span></button>&nbsp;";
					row += "<button type='button' class='btn btn-outline-warning' ";
					row += "onclick='editCar(" + car.id + ")'><span class='glyphicon glyphicon-pencil'></span>";
					row += "</button>&nbsp;<button type='button' class='btn btn-outline-danger' ";
					row += "onclick='removeCar(" + car.id + ")'><span class='glyphicon glyphicon-remove'></span>";
					row +="</button></td></tr>";
					$('#carsTable').append(row);	
				});
			}
		}	
	});
}

function removeCar(id) {
	if (id == id && id > 0) {
		$.ajax({
			url: "repos/removeCarById.php",
			type: "post",
			data: {
				"id": id
			},
			success: function() {
				buildCarTable();
			}
		});
	}	
}

function editCar(id) {
	clearModals();
	$.ajax({
		url: "repos/getCarById.php",
		type: "post",
		dataType: "json",
		data: {
			"id": id
		},
		success: function(results) {
			var car = results[0];
			if (car != null) {
				$('#editCarModal').modal('show');
				$('#editCarIdHdn').val(id);
				$('#editMake').val(car['make']);
				$('#editModel').val(car['model']);
				$('#editColor').val(car['color']);
				$('#editYear').val(car['year']);
			}
		}
	});
}

function editPicture(id) {
	$('#editCarPicHdn').val(id);
	$.ajax({
		url: "repos/getCarPic.php",
		data: {
			id: id
		},
		type: "post",
		success: function(results) {
			$('#editCarPicModal').modal('show');
			$('#carPicSpot').attr("src", "upload/" .results);
			//document.getElementById('carPicSpot').files[0] = results;
		}	
	});
}

function picUpdate(event) {
	var result = event.target.result;
	var id = $('editCarIdHdn').val();
	var fileName = document.getElementById('pictureEditFile').files[0];
	$.post("repos/updatePic.php", {data: result, id: id}, continueSubmission);
}

function updateCar(id) {
	var make = $('#editMake').val();
	var model = $('#editModel').val();
	var color = $('#editColor').val();
	var year = $('#editYear').val();
	$.ajax({
		url:  "repos/updateCarById.php",
		type: "post",
		data: {
			"id": id,
			"make": make,
			"model": model,
			"color": color,
			"year": year
		},
		success: function() {
			$('#editCarModal').modal('hide');
			buildCarTable();
		}
	});
}