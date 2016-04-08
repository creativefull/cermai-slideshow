$("#tambahImage").submit(function() {
	var form = new FormData();
	var caption = $("#caption").val();
	var description = $("#description").val();
	var gambar = document.getElementById("file").files[0];
	var type = $(this).attr("data-type");
	var id = $(this).attr("data-id");

	if (type == "tambah") {
		if (gambar == undefined) {
			$("#proses").html("<p class=\"alert alert-danger\">Image Can't Be Empty</p>");
			return false;
		}

		if (caption == '' || description == '') {
			$("#proses").html("<p class=\"alert alert-danger\">Theres an empty data</p>");
			return false;
		}

		form.append("caption", caption);
		form.append("description", description);
		form.append("published",1);
		form.append("gambar", gambar);

		$.ajax({
			url : '/items/save',
			type : 'POST',
			data : form,
			cache: false,
			contentType: false,
			processData: false,
			beforeSend : function(msg) {
				console.log("Sedang Mengirim Data");
				$("#tambahImage button[type='submit']").attr("disabled","disabled");
			},
			success : function(msg) {
				$("#tambahImage button[type='submit']").removeAttr("disabled");
				console.log(msg);
				if (msg == 'success') {
					window.location.reload();
				}
				else {
					$("#proses").html("<p class=\"alert alert-danger\">Kesalahan Server</p>");
				}
			}
		});
	}
	else if (type == "edit") {
		var data = {
			id : id,
			caption : caption,
			desc : description
		}
		$.ajax({
			url : '/items/save/edit',
			type : 'POST',
			data : data,
			beforeSend : function() {
				console.log("Sedang Mengirim");
			},
			success : function(msg) {
				if (msg == 'success') {
					window.location.reload();		
				}
				else {
					$("#proses").html("<p class=\"alert alert-danger\">Kesalahan Server</p>");						
				}
			}
		})
	}
	return false;
})

function clickUpload() {
	$("#file").trigger("click");
	return false;
}
function readURL(input) {
	if (input.files && input.files[0]) {
	var reader = new FileReader();
	reader.onload = function(e) {
		var gambar = e.target.result;
		//- var gambar = document.getElementById('file').files[0]
		$('#preview-img').css('background-image', 'url(' + e.target.result + ')');
		$("#preview-img").text("");
	}
		reader.readAsDataURL(input.files[0]);
	}
}

function edit(id, caption, desc, img) {
	$("#caption").val(caption);
	$("#description").val(desc);
	$("#preview-img").css({"background-image" : "url('" + img + "')"}).text("");
	$("#btnUpload").attr("disabled", "disabled").text("Image Can't Edit");
	$("#btnCancel").fadeIn(200);
	$("#tambahImage").attr({"data-type" : "edit", "data-id" : id});
	return false;
}
function removeItem(id) {
	var confirms = confirm("Are you realy want to delete this item ? ");
	if (confirms) {
		$.ajax({
			url : "/items/hapus",
			type : "POST",
			data : { id : id},
			beforeSend : function() {
				console.log("Mengirim Data");
			},
			success : function(msg) {
				window.location.reload();					
			}
		})	
	}
	//- return false;
}
