$(document).ready(function() {

	tableContent('/api/users/list');

	$('.btn-primary').click(function(event) {
		var params = $('input[name="search"]').val();
		$('tbody').children().not(':first').remove();
		if (!params) {
			tableContent('/api/users/list');
		} else {
			tableContent('/api/users/list/search='+params);
		}
	});

	$('body').on('hidden.bs.modal', '.modal', function(event) {
		event.preventDefault();
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
		$('.modal').remove();
	});

});

function tableContent(url) {

	$.get(url, function(data) {
        $.each(data, function(index, val) {

            // ROW 

                $(document.createElement('tr')).attr('customer_id', val.id).appendTo('table');

                // CUSTOMER (ALL DETAILS)

                    $(document.createElement('td')).appendTo('tr:last-child');
                    $(document.createElement('button')).attr({
                        class: 'btn btn-success fa fa-search',
                        onclick: 'customerModal('+val.id+', "details")'
                    }).appendTo('tr:last-child td:last-child');

                // CUSTOMER (NAME)

                    $(document.createElement('td')).appendTo('tr:last-child');
                    $('tr:last-child td:last-child').text(val.first_name+' '+val.last_name);

                // CUSTOMER (EMAIL)

                    $(document.createElement('td')).appendTo('tr:last-child');
                    $('tr:last-child td:last-child').text(val.email);                        

                // CUSTOMER (PHONE)

                    $(document.createElement('td')).appendTo('tr:last-child');
                    $('tr:last-child td:last-child').text(val.phone);  

                // CUSTOMER (ADDRESS)

                    $(document.createElement('td')).appendTo('tr:last-child');
                    $('tr:last-child td:last-child').text(val.street+', '+val.city);  

                // CUSTOMER (OPTIONS)

                    $(document.createElement('td')).appendTo('tr:last-child');

                    $(document.createElement('button')).attr({
                        class: 'btn btn-danger',
                        onclick: 'deleteModal('+val.id+')'
                    }).append($(document.createElement('i')).addClass('fa fa-trash')).append(' Delete').appendTo('tr:last-child td:last-child');                   
                    $(document.createElement('button')).attr({
                        class: 'btn btn-warning',
                        onclick: 'customerModal('+val.id+', "update")'
                    }).append($(document.createElement('i')).addClass('fa fa-pencil')).append(' Edit').appendTo('tr:last-child td:last-child');   

        });
    });
}

function customerModal(id, opt) {

	// MODAL 

		$(document.createElement('div')).attr({
			'class': 'modal fade',
			'id': 'userModal',
			'tabindex': '-1',
			'role': 'dialog',
			'aria-labelledby': 'modalLabel',
			'aria-hidden': 'true'
		}).appendTo('body');

		// MODAL DIALOG

			$(document.createElement('div')).attr({
				'class': 'modal-dialog',
				'role': 'document'
			}).appendTo('.modal');

			// MODAL CONTENT

				$(document.createElement('div')).addClass('modal-content').appendTo('.modal-dialog');

				// MODAL HEADER

					$(document.createElement('div')).addClass('modal-header')
					.append($(document.createElement('h5')).attr({
						'class': 'modal-title',
						'id': 'modalLabel',
					}).text('User details')).appendTo('.modal-content');

				// MODAL BODY

					$(document.createElement('div')).addClass('modal-body').appendTo('.modal-content');
					$(document.createElement('div')).addClass('form-group').appendTo('.modal-body');

					// INPUTS

						// FIRST NAME INPUT

							$(document.createElement('label')).attr({
								'for': 'user_fname',
								'class': 'col-form-label',
							}).text('First name:').appendTo('.form-group');

							$(document.createElement('input')).attr({
								'type': 'text',
								'class': 'form-control',
								'id': 'user_fname'
							}).appendTo('.form-group');

						// LAST NAME INPUT

							$(document.createElement('label')).attr({
								'for': 'user_lname',
								'class': 'col-form-label',
							}).text('Last name:').appendTo('.form-group');

							$(document.createElement('input')).attr({
								'type': 'text',
								'class': 'form-control',
								'id': 'user_lname'
							}).appendTo('.form-group');

						// EMAIL INPUT

							$(document.createElement('label')).attr({
								'for': 'user_email',
								'class': 'col-form-label',
							}).text('Email:').appendTo('.form-group');

							$(document.createElement('input')).attr({
								'type': 'email',
								'class': 'form-control',
								'id': 'user_email'
							}).appendTo('.form-group');

						// PHONE INPUT

							$(document.createElement('label')).attr({
								'for': 'user_phone',
								'class': 'col-form-label',
							}).text('Phone:').appendTo('.form-group');

							$(document.createElement('input')).attr({
								'type': 'text',
								'class': 'form-control',
								'id': 'user_phone'
							}).appendTo('.form-group');

						// CITY INPUT

							$(document.createElement('label')).attr({
								'for': 'user_city',
								'class': 'col-form-label',
							}).text('City:').appendTo('.form-group');

							$(document.createElement('input')).attr({
								'type': 'text',
								'class': 'form-control',
								'id': 'user_city'
							}).appendTo('.form-group');

						// ZIP CODE INPUT

							$(document.createElement('label')).attr({
								'for': 'user_zipcode',
								'class': 'col-form-label',
							}).text('Zip Code:').appendTo('.form-group');

							$(document.createElement('input')).attr({
								'type': 'text',
								'class': 'form-control',
								'id': 'user_zipcode'
							}).appendTo('.form-group');

						// ADDRESS INPUT

							$(document.createElement('label')).attr({
								'for': 'user_address',
								'class': 'col-form-label',
							}).text('Address:').appendTo('.form-group');

							$(document.createElement('input')).attr({
								'type': 'text',
								'class': 'form-control',
								'id': 'user_address'
							}).appendTo('.form-group');

						// NUMBER INPUT

							$(document.createElement('label')).attr({
								'for': 'user_number',
								'class': 'col-form-label',
							}).text('Number:').appendTo('.form-group');

							$(document.createElement('input')).attr({
								'type': 'text',
								'class': 'form-control',
								'id': 'user_number'
							}).appendTo('.form-group');

						// DOOR INPUT

							$(document.createElement('label')).attr({
								'for': 'user_door',
								'class': 'col-form-label',
							}).text('Door:').appendTo('.form-group');

							$(document.createElement('input')).attr({
								'type': 'text',
								'class': 'form-control',
								'id': 'user_door'
							}).appendTo('.form-group');

				// MODAL FOOTER

					$(document.createElement('div')).addClass('modal-footer').appendTo('.modal-content');
					$(document.createElement('button')).attr({
						'type': 'button',
						'class': 'btn btn-secondary',
						'data-dismiss': 'modal'
					}).append('Close').appendTo('.modal-footer');
					$(document.createElement('button')).attr({
						'type': 'button',
						'class': 'btn btn-primary',
					}).append('Update').appendTo('.modal-footer');

	$('.modal').modal(); // CALL MODAL

	$.get('api/users/'+id, function(data) {
		$('#user_fname').val(data.first_name);
		$('#user_lname').val(data.last_name);
		$('#user_email').val(data.email);
		$('#user_phone').val(data.phone);
		$('#user_city').val(data.city);
		$('#user_zipcode').val(data.zip_code);
		$('#user_address').val(data.street);
		$('#user_number').val(data.number);
		$('#user_door').val(data.house_number);
	});

	if (opt == 'details') {
		$('.form-group input').attr('disabled', 'true');
		$('button:contains("Update")').remove();
	}	
}

function deleteCustomer(id) {
	$.post('/customers/delete/'+id, {_token: $('input[name="_token"]').val()})
		.done( function() {
			$('.modal-body p').text('Record deleted successfully ✅');
			$('.modal-footer button:contains("Delete")').remove();
			$('tr[customer_id="'+id+'"]').remove();
		})
		.fail( function(status) {
			$('.modal-body p').text('Record cannot be deleted (Error '+status.status+') ❌');
		});
}

function deleteModal(id) {

	$(document.createElement('div')).attr({
			'class': 'modal fade',
			'id': 'userModal',
			'tabindex': '-1',
			'role': 'dialog',
			'aria-labelledby': 'modalLabel',
			'aria-hidden': 'true'
		}).appendTo('body');

		// MODAL DIALOG

			$(document.createElement('div')).attr({
				'class': 'modal-dialog',
				'role': 'document'
			}).appendTo('.modal');

			// MODAL CONTENT

				$(document.createElement('div')).addClass('modal-content').appendTo('.modal-dialog');

				// MODAL HEADER

					$(document.createElement('div')).addClass('modal-header')
					.append($(document.createElement('h5')).attr({
						'class': 'modal-title',
						'id': 'modalLabel',
					}).text('Customers')).appendTo('.modal-content');

				// MODAL BODY

					$(document.createElement('div')).addClass('modal-body').appendTo('.modal-content');
					$(document.createElement('p')).text('Are you sure you want to delete this record?').appendTo('.modal-body');

				// MODAL FOOTER

					$(document.createElement('div')).addClass('modal-footer').appendTo('.modal-content');
					$(document.createElement('button')).attr({
						'type': 'button',
						'class': 'btn btn-secondary',
						'data-dismiss': 'modal'
					}).append('Close').appendTo('.modal-footer');
					$(document.createElement('button')).attr({
						'type': 'button',
						'class': 'btn btn-primary bg-danger',
						'onclick': 'deleteCustomer('+id+')'
					}).append('Delete').appendTo('.modal-footer');

	$('.modal').modal(); // CALL MODAL

}