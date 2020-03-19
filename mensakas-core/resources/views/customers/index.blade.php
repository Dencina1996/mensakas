@extends('layouts.app')

@push('styles')
<link href="{{ asset('css/filterTable.css') }}" rel="stylesheet">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<script
  src="https://code.jquery.com/jquery-3.4.1.js"
  integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
  crossorigin="anonymous"></script>
@endpush

@section('space')
    @include('layouts.secondNav', ['title' => 'Customers'])
@endsection

@section('content')
<div class="table d-flex justify-content-center">
    <div class="table-wrapper">
        <div class="table-filter">
            <div class="row">
                <div class="col-sm-3"> </div>
                <div class="col-sm-9">
                    <form action="" method="get">
                        <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                        <div class="filter-group">
                            <label>Search</label>
                            <input type="text" class="form-control" name="search">
                        </div>
                        <span class="filter-icon"><i class="fa fa-filter"></i></span>
                    </form>
                </div>
            </div>
        </div>
        <table class="table table-striped table-hover">
            <tr>
            <td></td>
            <td><strong>Name</strong></td>
            <td><strong>Email</strong></td>
            <td><strong>Phone</strong></td>
            <td><strong>Address</strong></td>
            <td colspan="2"> 
                <form action="{{route('customers.create')}}" method="get">
                    <button type="submit" value="Add new customer" class="btn btn-success ml-4"><i class="fa fa-plus"></i> Add customer</button>
                </form>
            </td>

            </tr>

            
        </table>
    </div>
</div>
<script type="text/javascript">
    $(document).ready(function() {
        $.get('/api/users/users_list', function(data) {
            $.each(data, function(index, val) {

                // ROW 

                    $(document.createElement('tr')).appendTo('table');

                    // CUSTOMER (ALL DETAILS)

                        $(document.createElement('td')).appendTo('tr:last-child');
                        $(document.createElement('button')).attr({
                            class: 'btn btn-success fa fa-search',
                            onclick: 'alert("DETAILS")'
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
                        $('tr:last-child td:last-child').text(val.customer_addresse.street+', '+val.customer_addresse.city);  

                    // CUSTOMER (OPTIONS)

                        $(document.createElement('td')).appendTo('tr:last-child');

                        $(document.createElement('button')).attr({
                            class: 'btn btn-danger',
                            onclick: 'alert("DELETE")'
                        }).append($(document.createElement('i')).addClass('fa fa-trash')).append(' Delete').appendTo('tr:last-child td:last-child');                   
                        $(document.createElement('button')).attr({
                            class: 'btn btn-warning',
                            onclick: 'alert("EDIT")'
                        }).append($(document.createElement('i')).addClass('fa fa-pencil')).append(' Edit').appendTo('tr:last-child td:last-child');   


               /*$('table tr:last-child').after('<tr><td><form action="http://localhost:8000/customers/'+val.id+'" method="get"><button type="submit" class="btn btn-success fa fa-search"></button></form></td> <td>'+val.first_name+' '+val.last_name+'</td> <td>'+val.email+'</td> <td>'+val.phone+'</td> <td>'+val.customer_addresse.street+', '+val.customer_addresse.city+'</td> <td><form action="http://localhost:8000/customers/'+val.id+'/edit" method="get"><button type="submit" value="Edit" class="btn btn-warning"><i class="fa fa-pencil"></i> Edit</button></form></td> <td><form action="http://localhost:8000/customers/'+val.id+'" method="post"><input type="hidden" name="_token" value="'+$('input[name="_token"]').val()+'"> <input type="hidden" name="_method" value="DELETE"> <button type="submit" value="Delete" class="btn btn-danger"><i class="fa fa-trash"></i> Delete</button></form></td></tr>');*/
               console.log(val);
            });
        });
    });
    
</script>
@endsection
