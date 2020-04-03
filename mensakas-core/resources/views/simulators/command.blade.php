@extends('layouts.app')

@push('styles')

<script
  src="https://code.jquery.com/jquery-3.4.1.js"
  integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
  crossorigin="anonymous"></script>
<script type="text/javascript" src="/js/command.js"></script>
@endpush
@section('space')
@include('layouts.secondNav',['title'=>'Make order'])
@endsection


@section('content')
@csrf
	
<div class="container">
	<button type="button" class="btn btn-success mb-2" onclick="window.history.back();">Back</button>
</div>
<div class="container">
	<div class="form-row">
		<div class="form-group col-md-6">
			<label for="input_fname">First Name</label>
			<input type="text" class="form-control" id="input_fname" value="">
		</div>
		<div class="form-group col-md-6">
			<label for="input_lname">Last Name</label>
			<input type="text" class="form-control" id="input_lname" value="">
		</div>
	</div>
	<div class="form-row">
		<div class="form-group col-md-8">
			<label for="input_address">Address</label>
			<input type="text" class="form-control" id="input_address" value="">
		</div>
		<div class="form-group col-md-2">
			<label for="input_number">Number</label>
			<input type="text" class="form-control" id="input_number" value="">
		</div>
		<div class="form-group col-md-2">
			<label for="input_door">Door Number</label>
			<input type="text" class="form-control" id="input_door" value="">
		</div>
	</div>
	<div class="form-row">
		<div class="form-group col-md-10">
			<label for="input_city">City</label>
			<input type="text" class="form-control" id="input_city" placeholder="Barcelona" value="">
		</div>
		<div class="form-group col-md-2">
			<label for="input_zip">Zip</label>
			<input type="text" class="form-control" id="input_zip" value="8000">
			</div>
	</div>
	<div class="form-row">
		<div class="form-group col-md-6">
			<label for="input_email">E-Mail</label>
			<input type="text" class="form-control" id="input_email" value="">
		</div>
		<div class="form-group col-md-6">
			<label for="input_phone">Phone</label>
			<input type="text" class="form-control" id="input_phone" value="">
		</div>
	</div>
	<button type="button" class="btn btn-primary">Search Businesses</button>
</div>
<div class="container">
	
</div>
<div class="container" id="status" style="text-align: center;">

</div>
@endsection