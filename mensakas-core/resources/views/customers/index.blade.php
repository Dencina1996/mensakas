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

@section('script')
    <script src="{{ asset('/js/customerIndex.js') }} " defer></script>
@endsection

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
                    <button class="btn btn-primary">
                        <i class="fa fa-search"></i>
                    </button>
                    <div class="filter-group">
                        <label>Search</label>
                        <input type="text" class="form-control" name="search">
                    </div>
                    <span class="filter-icon"><i class="fa fa-filter"></i></span>
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


@endsection
