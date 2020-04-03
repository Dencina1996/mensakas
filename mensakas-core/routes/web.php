<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

//Menus
Route::get('/', 'HomeController@index')->name('home');

Route::get('/home', function () {
    return  redirect()->route('home');
});

Route::get('/users', function () {
    return view('users');
})->middleware('auth');


//Cruds
Route::get('comandas', 'ComandaController@index')->name('comandas.index')->middleware('auth');

Route::get('comandas/{comanda}', 'ComandaController@show')->name('comandas.show')->middleware('auth');

Route::get('comandas/{comanda}/edit', 'ComandaController@edit')->name('comandas.edit')->middleware('auth');

Route::put('comandas/{comanda}', 'ComandaController@update')->name('comandas.update')->middleware('auth');

Route::resource('adminUsers', 'AdminUserController')->middleware('auth');

Route::resource('riders', 'RiderController')->middleware('auth');

Route::resource('customers', 'CustomerController')->middleware('auth');

Route::resource('businesses', 'BusinessController')->middleware('auth');

Route::resource('products', 'ProductController')->middleware('auth');

//simulator menu
Route::view('/simulators', 'simulatorsMenu');

//Simulator comanda
Route::view('simulator/comanda', 'simulators.business.form');

Route::post('simulator/comanda', 'Simulator\Business\BusinessSimulatorController@customerStore')->name('simulator.comanda.customerStore');

Route::get('simulator/comanda/{customer}/zip/{zip}', 'Simulator\Business\BusinessSimulatorController@businessesInZipCode')->name('simulator.comanda.businessesInZipCode');

Route::get('simulator/comanda/{customer}/menu/{business}', 'Simulator\Business\BusinessSimulatorController@businessMenu')->name('simulator.comanda.businessMenu');

Route::post('simulator/comanda/{customer}/menu/{business}', 'Simulator\Business\BusinessSimulatorController@saveOrder')->name('simulator.comanda.saveOrder');

Route::get('simulator/comanda/{order}/pay', 'Simulator\Business\BusinessSimulatorController@pay')->name('simulator.comanda.pay');

Route::patch('simulator/comanda/{order}/pay', 'Simulator\Business\BusinessSimulatorController@makePaid')->name('simulator.comanda.makePaid');

Route::get('simulator/business/{order}/status', 'Simulator\Business\BusinessSimulatorController@orderStatus')->name('simulator.comanda.orderStatus');

//Simulator rider
Route::get('simulator/rider', 'Simulator\Rider\RiderSimulatorController@selectRider')->name('simulator.rider.selectRider');

Route::get('simulator/rider/{rider}/jobs', 'Simulator\Rider\RiderSimulatorController@jobs')->name('simulator.rider.jobs');

Route::post('simulator/rider', 'Simulator\Rider\RiderSimulatorController@setJob')->name('simulator.rider.setjob');

Route::patch('simulator/rider', 'Simulator\Rider\RiderSimulatorController@changeStatus')->name('simulator.rider.changeStatus');

Route::get('simulator/rider/{order}/order', 'Simulator\Rider\RiderSimulatorController@status')->name('simulator.rider.status');

//Simulator business/restaurant
Route::get('simulator/restaurants', 'Simulator\RestaurantSimulatorController@listBusinesses')->name('simulator.restaurant.listBusinesses');

Route::get('simulator/restaurants/{business}', 'Simulator\RestaurantSimulatorController@ordersInRestaurant')->name('simulator.restaurant.ordersInRestaurant');

Route::get('simulator/restaurants/{business}/order/{order}', 'Simulator\RestaurantSimulatorController@order')->name('simulator.restaurant.order');

Route::patch('simulator/restaurants/{business}/order/{order}', 'Simulator\RestaurantSimulatorController@preparingOrder')->name('simulator.restaurant.preparing');

// API Users

	// Customers

		// All Customers

			Route::get('/api/users/customers/all/', 'Api\Users@getAllCustomers');

		// Customer Details

			Route::get('/api/users/customers/id={id}', 'Api\Users@getCustomerDetails');

		// Search Customer

			Route::get('/api/users/customers/search={params}', 'Api\Users@customerListFiltered');

		// Businesses Near Customer

			Route::get('/api/users/customers/closeto={id}', 'Api\Users@customerBussinessesNearBy');

	// Riders

		// All Riders

			Route::get('/api/users/riders/all/', 'Api\Users@getAllRiders');

		// Rider Details

			Route::get('/api/users/riders/id={id}', 'Api\Users@getRiderDetails');

		// Search Rider

			Route::get('/api/users/riders/search={params}', 'Api\Users@riderListFiltered');

		// Active Riders

			Route::get('/api/users/riders/active', 'Api\Users@getActiveRiders');

		// Rider Deliveries

			Route::get('/api/users/riders/deliveries/{id}', 'Api\Users@getRiderDeliveries');

			


// Users CRUD Ajax

	// Customers

		// ADD

			Route::post('/customers/add', 'CustomerController@store');

		// UPDATE

			Route::post('/customers/update/{id}', 'CustomerController@update');

		// DELETE

			Route::post('/customers/delete/{id}', 'CustomerController@destroy');

		// SEARCH

			Route::get('/api/users/customers/search={params}', 'Api\Users@customerListFiltered');

	// Riders

		// ADD

			Route::post('/riders/add', 'RiderController@store');

		// UPDATE

			Route::post('/riders/update/{id}', 'RiderController@update');

		// DELETE

			Route::post('/riders/delete/{id}', 'RiderController@destroy');

		// SEARCH

			Route::get('/api/users/riders/search={params}', 'Api\Users@riderListFiltered');

// Users Part 2 - Comanda AJAX

	Route::get('/command', function() {
		return view('simulators.command');
	});

	// Businesses With Zip

		Route::get('/list/businesses/{zip}', 'Simulator\Business\BusinessSimulatorController@getBusinessesByZip');

	// Menus From Business

		Route::get('/list/products/{id}', 'Simulator\Business\BusinessSimulatorController@getMenus');

	// Update Order Status

		Route::post('/update/order/{id}', 'Simulator\Business\BusinessSimulatorController@payCommand');