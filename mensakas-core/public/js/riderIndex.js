$(document).ready(function() {

    tableContent('/api/users/riders/all/');

    $('.btn-primary').click(function(event) {
        var params = $('input[name="search"]').val();
        $('tbody').children().not(':first').remove();
        if (!params) {
            tableContent('/api/users/riders/all/');
        } else {
            tableContent('/api/users/riders/search=' + params);
        }
    });

    $('body').on('hidden.bs.modal', '.modal', function(event) {
        event.preventDefault();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('.modal').remove();
    });

    $('.addButton').click(function(event) {
        riderModal(null, 'add');
    });

});

function tableContent(url) {

    $('tr[rider_id').remove();

    $.get(url, function(data) {
        if (data.length == 0) {
            $(document.createElement('tr')).appendTo('table');
            $(document.createElement('td')).attr('colspan', '2').text('No results found').appendTo('tr:last-child');
            $(document.createElement('td')).appendTo('tr:last-child');
            $(document.createElement('td')).appendTo('tr:last-child');
            $(document.createElement('td')).appendTo('tr:last-child');
            $(document.createElement('td')).appendTo('tr:last-child');
        } else {
            $.each(data, function(index, val) {

                // ROW 

                $(document.createElement('tr')).attr('rider_id', val.id).appendTo('table');

                // RIDER (ALL DETAILS)

                $(document.createElement('td')).appendTo('tr:last-child');
                $(document.createElement('button')).attr({
                    class: 'btn btn-success fa fa-search',
                    onclick: 'riderModal(' + val.id + ', "details")'
                }).appendTo('tr:last-child td:last-child');

                // RIDER ( FIRST NAME)

                $(document.createElement('td')).appendTo('tr:last-child');
                $('tr:last-child td:last-child').text(val.first_name);

                // RIDER (LAST NAME)

                $(document.createElement('td')).appendTo('tr:last-child');
                $('tr:last-child td:last-child').text(val.last_name);

                // RIDER (USERNAME)

                $(document.createElement('td')).appendTo('tr:last-child');
                $('tr:last-child td:last-child').text(val.username);

                // RIDER (PHONE)

                $(document.createElement('td')).appendTo('tr:last-child');
                $('tr:last-child td:last-child').text(val.phone);

                // RIDER (OPTIONS)

                $(document.createElement('td')).appendTo('tr:last-child');

                $(document.createElement('button')).attr({
                    class: 'btn btn-danger',
                    onclick: 'deleteModal(' + val.id + ')'
                }).append($(document.createElement('i')).addClass('fa fa-trash')).append(' Delete').appendTo('tr:last-child td:last-child');
                $(document.createElement('button')).attr({
                    class: 'btn btn-warning',
                    onclick: 'riderModal(' + val.id + ', "update")'
                }).append($(document.createElement('i')).addClass('fa fa-pencil')).append(' Edit').appendTo('tr:last-child td:last-child');
            });
        }
    });
}

function riderModal(id, opt) {

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
        }).text('Rider details')).appendTo('.modal-content');

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
        'id': 'user_fname',
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

    // USERNAME INPUT

    $(document.createElement('label')).attr({
        'for': 'user_username',
        'class': 'col-form-label',
    }).text('Username:').appendTo('.form-group');

    $(document.createElement('input')).attr({
        'type': 'text',
        'class': 'form-control',
        'id': 'user_username'
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

    if (opt == 'details' || opt == 'update') { // SEND DATA TO MODAL

        $.get('/api/users/riders/id=' + id, function(data) {
            $('#user_fname').val(data[0].first_name);
            $('#user_lname').val(data[0].last_name);
            $('#user_username').val(data[0].username);
            $('#user_phone').val(data[0].phone);
            if (opt == 'details') {
                $('.form-group input').attr('disabled', 'true');
                $('button:contains("Update")').remove();
                if (data[0].active == '1') {
                    $(document.createElement('br')).appendTo('.form-group');
                    $(document.createElement('p')).text('🟢 Active').css({
                        marginTop: '10px',
                        textAlign: 'center'
                    }).appendTo('.form-group');
                } else {
                    $(document.createElement('br')).appendTo('.form-group');
                    $(document.createElement('p')).text('🔴 Inactive').css({
                        marginTop: '10px',
                        textAlign: 'center'
                    }).appendTo('.form-group');
                }
                if (data[0].latitude == null) {
                    $(document.createElement('p')).text('Latitude: -').appendTo('.form-group');
                    $(document.createElement('p')).text('Longitude: -').appendTo('.form-group');
                    $(document.createElement('p')).text('Accuracy: -').appendTo('.form-group');
                    $(document.createElement('p')).text('Speed: -').appendTo('.form-group');
                } else {
                    $(document.createElement('p')).text('Latitude: '+data[0].latitude+'º').appendTo('.form-group');
                    $(document.createElement('p')).text('Longitude: '+data[0].longitude+'º').appendTo('.form-group');
                    $(document.createElement('p')).text('Accuracy: '+data[0].accuracy).appendTo('.form-group');
                    $(document.createElement('p')).text('Speed: '+data[0].speed+' km/h').appendTo('.form-group');
                }    
            }
            if (opt == 'update') {
                $('#modalLabel').text('Edit rider');
                $(document.createElement('br')).appendTo('.form-group');
                $(document.createElement('p')).append($(document.createElement('input')).attr({
                    type: 'radio',
                    name: 'user_active',
                    value: 1
                }).css('verticalAlign', 'middle')).append(' Active 🟢').appendTo($('.form-group'));
                $(document.createElement('p')).append($(document.createElement('input')).attr({
                    type: 'radio',
                    name: 'user_active',
                    value: 0
                }).css('verticalAlign', 'middle')).append(' Inactive 🔴').appendTo($('.form-group'));
                if (data[0].active == 1) {
                    $('input[type="radio"]').eq(0).attr('checked', 'true');
                } else {
                    $('input[type="radio"]').eq(1).attr('checked', 'true');
                }
                $('button:contains("Update")').click(function(event) {
                    $.post('/riders/update/' + id, {
                        _token: $('input[name="_token"]').val(),
                        first_name: $('#user_fname').val(),
                        last_name: $('#user_lname').val(),
                        username: $('#user_username').val(),
                        phone: $('#user_phone').val(),
                        active: $('input[name="user_active"]:checked').val(),
                    }).done(function() {
                        $('.modal-body').empty();
                        $('button:contains("Update")').remove();
                        $(document.createElement('p')).text('Record changed successfully ✅').appendTo('.modal-body');
                        $('.modal-footer button:contains("Add")').remove();
                        tableContent('/api/users/riders/all');
                    }).fail(function(status) {
                        $('.modal-body p').remove();
                        $('.modal-body').prepend($(document.createElement('p')).text('Record cannot be changed (Error ' + status.status + ') ❌'));
                    });
                });
            }
        });
    }

    
    if (opt == 'add') {
        $('#modalLabel').text('Add rider');
        $(document.createElement('br')).appendTo('.form-group');
        $(document.createElement('p')).append($(document.createElement('input')).attr({
            type: 'radio',
            name: 'user_active',
            value: 1
        }).css('verticalAlign', 'middle')).append(' Active 🟢').appendTo($('.form-group'));
        $(document.createElement('p')).append($(document.createElement('input')).attr({
            type: 'radio',
            name: 'user_active',
            value: 0
        }).css('verticalAlign', 'middle')).append(' Inactive 🔴').appendTo($('.form-group'));
        $('button:contains("Update")').text('Add').click(function(event) {
            $('.form-group input').each(function(index, el) {
                $(el).removeClass('is-invalid');
                if ($.trim($(el).val()) == '') {
                    $(el).addClass('is-invalid');
                }
            });
            if ($('.form-group input.is-invalid').length > 0) {
                $('.modal-body p').remove();
                $('.modal-body').prepend($(document.createElement('p')).text('Please fill all the required fields ❌'));
            } else {
                $.post('/riders/add', {
                    _token: $('input[name="_token"]').val(),
                    first_name: $('#user_fname').val(),
                    last_name: $('#user_lname').val(),
                    username: $('#user_username').val(),
                    phone: $('#user_phone').val(),
                    active: $('input[name="user_active"]:checked').val(),
                }).done(function(msg) {
                    if (msg.success) {
                        $('.modal-body').empty();
                        $(document.createElement('p')).text('Record added successfully ✅').appendTo('.modal-body');
                        $('.modal-footer button:contains("Add")').remove();
                        tableContent('/api/users/riders/all');
                    } else {
                        $('.modal-body p').remove();
                        $('.modal-body').prepend($(document.createElement('p')).text(msg.error));
                    }
                }).fail(function(status) {
                    $('.modal-body p').remove();
                    $('.modal-body').prepend($(document.createElement('p')).text('Record cannot be added (Error ' + status.status + ') ❌'));
                });
            }
        });
    }

}

function deleteRider(id) {
    $.post('/riders/delete/' + id, {
            _token: $('input[name="_token"]').val()
        })
        .done(function() {
            $('.modal-body p').text('Record deleted successfully ✅');
            $('.modal-footer button:contains("Delete")').remove();
            $('tr[rider_id="' + id + '"]').remove();
        })
        .fail(function(status) {
            $('.modal-body p').text('Record cannot be deleted (Error ' + status.status + ') ❌');
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
        }).text('Riders')).appendTo('.modal-content');

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
        'onclick': 'deleteRider(' + id + ')'
    }).append('Delete').appendTo('.modal-footer');

    $('.modal').modal(); // CALL MODAL

}