<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class Users extends Controller
{

	// ------------------------------ CUSTOMERS ------------------------------ //

    public function getAllCustomers() { // All Customers
    	return 	DB::table('customer')
    			->join('customer_address', 'customer_address.customer_id', '=', 'customer.id')
    			->select('customer.*','customer_address.*')
    			->get();
    }

    public function getCustomerDetails($id) { // Customer Details
    	return 	DB::table('customer')
    			->where('customer.id', '=', $id)
    			->join('customer_address', 'customer_address.customer_id', '=', 'customer.id')
    			->select('customer.*', 'customer_address.*')
    			->get();
    			
    }

    public function customerListFiltered($params) { // Search Customer
    	return 	DB::table('customer')
    			->join('customer_address', 'customer_address.customer_id', '=', 'customer.id')
    			->where('customer.first_name', 'like', '%'.$params.'%')
		        ->orWhere('customer.last_name', 'like', '%'.$params.'%')
		        ->orWhere('customer.phone', 'like', '%'.$params.'%')
		        ->orWhere('customer_address.street', 'like', '%'.$params.'%')
		        ->orWhere('customer_address.city', 'like', '%'.$params.'%')
		        ->select('customer.*', 'customer_address.*')
		        ->get();
    }

    public function customerBussinessesNearBy($id) { // Businesses Near Customer
		return DB::table('business')
		->join('business_address', 'business_address.business_id', '=', 'business.id')
		->join('customer_address', 'customer_address.zip_code', '=', 'business_address.zip_code')
		->join('customer', 'customer.id', '=', 'customer_address.customer_id')
		->where('customer.id', '=', $id)
		->select('business.*')
		->get();
    }

    // ------------------------------ RIDERS ------------------------------ //

    public function getAllRiders() { // All Riders
    	return 	DB::table('rider')
    	->leftJoin('location', 'location.rider_id', '=', 'rider.id')
    	->select('rider.*','location.latitude', 'location.longitude', 'location.accuracy', 'location.speed')
    	->get();
    }

    public function getRiderDetails($id) { // Rider Details
    	return 	DB::table('rider')
    	->where('rider.id', '=', $id)
    	->leftJoin('location', 'location.rider_id', '=', 'rider.id')
    	->select('rider.*','location.latitude', 'location.longitude', 'location.accuracy', 'location.speed')
    	->get();
    }

    public function riderListFiltered($params) { // Search Rider
    	return 	DB::table('rider')
    			->where('rider.first_name', 'like', '%'.$params.'%')
		        ->orWhere('rider.last_name', 'like', '%'.$params.'%')
		        ->orWhere('rider.phone', 'like', '%'.$params.'%')
		        ->get();
    }

    public function getActiveRiders() { // Active Rider
    	return 	DB::table('rider')
    	->where('rider.active', '=', 1)
    	->leftJoin('location', 'location.rider_id', '=', 'rider.id')
    	->select('rider.*','location.latitude', 'location.longitude', 'location.accuracy', 'location.speed')
    	->get();
    }

    public function getRiderDeliveries($id) { // Rider Deliveries
    	return 	DB::table('delivery')
    	->where('delivery.riders_id', '=', $id)
    	->get();
    }
}
