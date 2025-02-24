function taskInfo(id) {
	$.ajax({
		url: "repos/getTaskById.php",
		type: "post",
		dataType: "json",
		data: {
			"id": id
		},
		success: function(result) {
			var task = result[0];
			$('#infoTaskIdHdn').val(id);
			$('#infoTaskName').append(task['name']);
			$('#infoTaskDescription').append(task['description']);
			$('#infoTaskModal').modal('show');
		}
	});
}

function closeInfo() {
	$('#infoTaskIdHdn').val('');
	$('#infoTaskName').empty();
	$('#infoTaskDescription').empty();
	$('#infoTaskModal').modal('hide');
}

function getCar(id) {
	$.ajax({
		url: "repos/getProjectById.php",
		type: "post",
		dataType: "json",
		data: {
			"id": id
		},
		success: function(results) {
			var car = results[0].car_id;
			$.ajax({
				url: "repos/getCarById.php",
				type: "post",
				datatType: "json",
				data: {
					"id": car
				},
				success: function(results2) {
					results2.forEach(function(car) {
						$('#infoCarMake').text(car.make);
						$('#infoCarModel').text(car.model);
						$('#infoCarYear').text(car.year);
						$('#infoCarColor').text(car.color);
					});
					$('#infoCarModal').modal('show');
				}
			});
		}
	});
}