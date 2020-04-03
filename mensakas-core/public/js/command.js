$(document).ready(function() {
	$('.btn-primary').click(function(event) {
		storeUser();
	});
});

function storeUser() {
	var zip_code = $('#input_zip').val();
	$('.container:eq(3) div input').each(function(index, el) {
		$(el).removeClass('is-invalid');
		if ($.trim($(el).val()) == '') {
    		$(el).addClass('is-invalid');
		}
	});
	if ($('.container:eq(3) div input.is-invalid').length > 0) {
	    $('.container:eq(3) p').remove();
	    $('.container:eq(3)').prepend($(document.createElement('p')).css('textAlign', 'center').text('Please fill all the required fields ❌'));
	} else {	
		$.post('simulator/comanda', 
			{
				_token: $('input[name="_token"]').val(),
				first_name: $('#input_fname').val(),
				last_name: $('#input_lname').val(),
				email: $('#input_email').val(),
				phone: $('#input_phone').val(),
				city: $('#input_city').val(),
				zip_code: $('#input_zip').val(),
				street: $('#input_address').val(),
				number: $('#input_number').val(),
				door: $('#input_door').val(),
			}).done(function(msg) {
				$('.container:eq(3)').fadeOut('slow', function() {
					createBusinessCards();
					$(document.createElement('input')).attr({
						id: 'customer_address',
						value: msg.address_id,
						type: 'hidden'
					}).appendTo('body');
					$(document.createElement('input')).attr({
						id: 'order_identifier',
						value: msg.order_id,
						type: 'hidden'
					}).appendTo('body');
					$(document.createElement('input')).attr({
						id: 'customer_identifier',
						value: msg.customer_id,
						type: 'hidden'
					}).appendTo('body');
					console.log(msg);
					$(this).remove();
				});
		    }).fail(function(status) {
		        alert('An error has ocurred: Error 500');
		    });
	}
}

function createBusinessCards() {
	$.get('/list/businesses/'+$('#input_zip').val(), function(data) {
		$.each(data, function(index, val) {
			$(document.createElement('button')).attr({
				'class': 'btn-info',
				'data-toggle': 'collapse',
				'href': '#collapseBus0',
				'role': 'button',
				'aria-expanded': 'false',
				'onclick': 'createCollapseMenu('+val.id+');'
			}).css('margin', '10px')
			.append($(document.createElement('img')).attr('src', 'https://picsum.photos/100/75').css({
				margin: '10px',
				border: 'solid 1px black'
			})).append('<br>'+val.name).appendTo('.container:eq(3)');
		});
	});
}

function createCollapseMenu(id) {
	$('[bus_id], .container:last br').remove();
	$(document.createElement("input")).attr({
		'bus_id': id,
		'type': 'hidden'
	}).appendTo("body");
	$('.collapse, h1, .btn-warning, b').remove();
	$(document.createElement('div')).attr({
		'class': 'collapse',
		'id': 'collapseBus0'
	}).append($(document.createElement('div')).addClass('card card-body')).appendTo('.container:eq(3)');
	$.get('/list/products/'+id, function(data) {
		$.each(data, function(index, val) {
			$('.container:eq(3) div .card-body')
			.append($(document.createElement('input')).attr({
				type: 'hidden',
				value: val.id,
				class: 'prod_id'
			}).appendTo($('.container:eq(3) div .card-body')));
			$('.container:eq(3) div .card-body')
			.append($(document.createElement('strong')).append(val.name));
			$('.container:eq(3) div .card-body strong').last().append('<br>')
			.after($(document.createElement('label')).append(val.description));
			$('.container:eq(3) div .card-body').last().append($(document.createElement('label')).addClass('text-info').text(val.price));
			$('.container:eq(3) div .card-body').last()
			.append($(document.createElement('div')).addClass('col-3'));
			$('.container:eq(3) div .card-body .col-3').last()
			.append($(document.createElement('button')).attr({
				class: 'btn btn-danger remove m-2',
				onclick: "subtract(this)"
			}).addClass('btn btn-danger remove m-2').append('-'));
			$('.container:eq(3) div .card-body .col-3').last()
			.append($(document.createElement('input')).attr({
				type: 'number',
				value: 0,
				disabled: 'true',
				class: 'col-4',
				min: 0
			}));
			$('.container:eq(3) div .card-body .col-3').last()
			.append($(document.createElement('button')).attr({
				class: 'btn btn-success add m-2',
				onclick: "sum(this)"
			}).addClass('btn btn-success add m-2').append('+'));
		});
		console.log(data);
	});
	$(document.createElement('b')).append('TOTAL: ').append($(document.createElement('label')).addClass('price text-danger').append('0'))
		.after(document.createElement('b')).addClass('text-danger').append(' €').appendTo('.container:eq(3)');
	$(document.createElement('br')).appendTo('.container:eq(3)')
	$(document.createElement('button')).addClass('btn btn-warning mt-2').attr('onclick', 'sendCommand()').append('Checkout').appendTo('.container:eq(3)');
}

function subtract(element) {
	if ($(element).next('input.col-4').val() == 0) {
		return false;
	} else {
		$(element).next('input.col-4').val(parseInt($(element).next('input.col-4').val())-1);
	}
	getPrice();
}

function sum(element) {
	$(element).prev('input.col-4').val(parseInt($(element).prev('input.col-4').val())+1)
	getPrice();
}

function getPrice() {
	var total = 0;
	$.each($('input.col-4'), function(index, val) {
		 total += ($(this).val()*parseFloat($(this).parent().parent().find('.text-info').eq(index).html()));
	});
	$('.price').text(total.toString());
}

function sendCommand() {
	$.post('simulator/comanda/'+parseInt($('#customer_identifier').val())+'/menu/'+parseInt($('[bus_id]').attr('bus_id')), {
            _token: $('input[name="_token"]').val(),
            command_id: $('#order_identifier').val(),
            total: parseFloat($('.price').text()),
            customer_address_id: $('#customer_address').val(),
            prod_id: parseInt($('.prod_id').last().val())
        })
        .done(function(msg) {
        	$(document.createElement('input')).attr({
        		id: 'order_status',
        		value: msg.orderDoneId,
        		type: 'hidden'
        	}).appendTo('body');
            showStatus();
        })
        .fail(function(status) {
            alert('Server Error: '+status.status);
        });
}

function showStatus() {
	$('.container:eq(3)').fadeOut('slow', function() {
		$(this).remove();
	});
	$(document.createElement('h1')).css('textAlign', 'center').appendTo('.container:last');
	$(document.createElement('img')).css('width', '250px').appendTo('.container:last');
	$(document.createElement('div')).addClass('progress mt-4 mb-4').css('border', 'solid 1px black').appendTo('.container:last');
	// Pay Button
		$(document.createElement('button')).addClass('btn btn-success mt-4 mr-4')
			.attr('onclick', 'updateStatus(2)').append('Pay').appendTo('.container:last');
	// Prepare Order Button
		$(document.createElement('button')).addClass('btn btn-success mt-4 mr-4')
			.attr('onclick', 'updateStatus(3)').append('Prepare Order').appendTo('.container:last');
	// In Delivery Button
		$(document.createElement('button')).addClass('btn btn-success mt-4 mr-4')
			.attr('onclick', 'updateStatus(4)').append('Deliver').appendTo('.container:last');
	// Delivered Button
		$(document.createElement('button')).addClass('btn btn-success mt-4 mr-4')
			.attr('onclick', 'updateStatus(5)').append('End Deliver').appendTo('.container:last');

	$(document.createElement('div')).attr({
		class: 'progress-bar progress-bar-striped bg-success progress-bar-animated',
		role: 'progressbar',
	}).css({
		width: '1%',
		borderRight: 'solid 1px black'
	}).appendTo('.progress');
	setInterval(function() {
		$.get('simulator/business/'+parseInt($('#order_status').val())+'/status', function(status) {
			if (status == 1) {
				$('#status h1').text('Pending of payment');
				$('#status img').attr('src', 'https://image.flaticon.com/icons/svg/856/856039.svg');
			}
			if (status == 2) {
				$('#status h1').text('Order confirmed');
				$('#status img').attr('src', 'https://image.flaticon.com/icons/svg/1019/1019709.svg');
				$('.progress-bar').css('width','25%');
			}
			if (status == 3) {
				$('#status h1').text('Preparing order');
				$('#status img').attr('src', 'https://image.flaticon.com/icons/svg/649/649395.svg');
				$('.progress-bar').css('width','50%');
			}
			if (status == 4) {
				$('#status h1').text('On the way');
				$('#status img').attr('src', 'https://image.flaticon.com/icons/svg/1920/1920607.svg');
				$('.progress-bar').css('width','75%');
			}
			if (status == 5) {
				$('#status h1').text('Order delivered');
				$('#status img').attr('src', 'https://image.flaticon.com/icons/svg/1647/1647680.svg');
				$('.progress-bar').css('width','100%');
			}
		});
	}, 1000);
	
}

function updateStatus(status) {
	$.post('/update/order/'+parseInt($('#order_status').val()), 
		{
			status: status
		});
}