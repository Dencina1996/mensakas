@extends('layouts.app')

@push('styles')
<link href="{{ asset('css/filterTable.css') }}" rel="stylesheet">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
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
        <table>
            <tr>
            <td></td>
            <td><strong>Name</strong></td>
            <td><strong>Emil</strong></td>
            <td><strong>Phone</strong></td>
            <td><strong>Address</strong></td>
            <td colspan="2"> 
                <form action="{{route('customers.create')}}" method="get">
                    <button type="submit" value="Add new customer" class="btn btn-success ml-4"><i class="fa fa-plus"></i> Add customer</button>
                </form>
            </td>

            </tr>

            @foreach($customers as $customer)
            <tr>
                <td>
                <form action="{{route('customers.show', ['customer'=>$customer->id])}}" method="get">
                    <button type="submit" class="btn btn-success fa fa-search"></button>
                </form>

                </td>
                <td>{{$customer->first_name}} {{$customer->last_name}}</td>
                <td>{{$customer->email}}</td>
                <td>{{$customer->phone}}</td>
                <td>{{$customer->customerAddresse->street}},{{$customer->customerAddresse->city}}</td>
                <td>
                    <form action="{{route('customers.edit', ['customer'=>$customer->id])}}" method="get">
                        <button type="submit" value="Edit" class="btn btn-warning"><i class="fa fa-pencil"></i> Edit</button>                        
                    </form>
                </td>
                <td>
                <form action="{{route('customers.destroy', ['customer'=>$customer])}}" method="post">
                    {{ csrf_field() }}
                    {{ method_field('DELETE') }}
                    <button type="submit" value="Delete" class="btn btn-danger" onclick="return confirm('Are you sure?')"><i class="fa fa-trash"></i> Delete</button>
                </form>
                </td>
            </tr>
            @endforeach
        </table>
    </div>
</div>
@endsection
