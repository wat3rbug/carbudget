$(document).ready(function() {

	$('#pushTagToDB').on("click", function() {
		$.ajax({
			url: "repos/addSubAssembly.php",
			type: "post",
			data: {
				"sa_name": $('#AddTag').val(),
				"project": $('#addTagIdHdn').val()
			},
			success: function() {
				$('#addTagModal').modal('hide');
				buildProjectTable();
			}
		})
	});	
});

function addTag(project) {
	$('#addTagIdHdn').val(project);
	$('#addTagModal').modal('show');
}

function removeTag(id) {
	$.ajax({
		url: "repos/removeTagById.php",
		type: "post",
		data:{
			"id": id
		},
		success: function() {
			buildProjectTable();
		}
	});
}
function addNewTag() {
	$('#addTagAllModal').modal('show');
}

function buildTagsTable() {
	$.ajax({
		url: "repos/getAllTags.php",
		dataType: "json",
		success: function(tags) {
			var firstrow = "<button type='button' class='btn btn-success' onclick='addNewTag()'>";
			firstrow += "<span class='glyphicon glyphicon-plus'>&nbsp;Add New Tag</span></button><br>";
			$('#allTagsTable').empty();
			$('#allTagsTable').append(firstrow);
			tags.forEach(function(tag) {
				row = "&nbsp;<div class='alert alert-secondary alert-dismissible fade show' role='alert'>" + tag.sa_name + "&nbsp;";
				row += "<button type='button' class='close' onclick='removeTagFull(" + tag.id + ")' aria-label='Close'>";
				row += "<span aria-hidden='true'>&times;</span></button></div>&nbsp;";
				$('#allTagsTable').append(row);
			});
		}
	});
}