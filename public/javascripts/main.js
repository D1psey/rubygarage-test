$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
})

let drawArray = data => {
	$('.greengerty').html('');
	data.map((el) => {
	$(".greengerty").append(`<tr class="hoverable"><th class="hoverable"><input type="checkbox" data-id="`+el._id+`"></th>
										 <td class="hoverable name-`+el._id+`" data-id="`+el._id+`">`+el.name+`</td>
										 <td class="hoverable">
										 	<div class="btn-group nahover">
										 		<img class="gimg btn" src="/images/updown.png">
										 		<img class="gimg btn edit" data-id="`+el._id+`" data-toggle='modal' data-target='#exampleModal' src="/images/pencil.png">
										 		<img class="gimg btn delete" data-id="`+el._id+`" src="/images/trash.png">
										 								</div></td></tr>`);
	$(".spinner-border").animate({opacity:0}, 200);
	});
}

$(document).ready(() => {
	helloWorld();
});

let helloWorld = () => {
	$.get('/getTasks', data => {
		drawArray(data);			
	}).then(() =>{
		$(".add").click(() => {
			$(".spinner-border").animate({opacity:1}, 200);
			let parameters = {"name": $(".addTaskText").val()};
			$('.addTaskText').val('');
			$.get('/addTask', parameters); 
			helloWorld();
		});
		$(".edit").click(() =>{
			$(".spinner-border").animate({opacity:1}, 200);
			let before = $(".name-"+event.target.dataset.id).text();
			$(".message-text").val(before);			
		});
		$(".edit-btn-confirm").click(() => {
			$(".spinner-border").animate({opacity:1}, 200);
			let after = $('.message-text').val();
			let parameters = {'before': before, 'after': after}
			$.get("/editTask", parameters);
			helloWorld();
		});
		$(".delete").click(() => {
			$(".spinner-border").animate({opacity:1}, 200);
			let parameters = {"_id": event.target.dataset.id}
			$.get('/deleteTask', parameters); 
			helloWorld();
		});
	});
}

