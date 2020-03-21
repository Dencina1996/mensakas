<?php

namespace App\Http\Controllers;

use App\Customer;
use App\CustomerAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $params = $request->except('_token');

        $customers = Customer::filter($params)->get();

        return view('customers.index')
            ->with('customers', $customers);     
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('customers.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'first_name' => 'string|max:45',
            'last_name' => 'string|max:45',
            'email' => 'string|max:45',
            'phone' => 'string|max:45',
            'city' => 'string|max:45',
            'zip_code' => 'integer|digits_between:0,11',
            'street' => 'string|max:45',
            'number' => 'integer|digits_between:0,11',
            'house_number' => 'string|max:45',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'One or more fields do not match the right type of data ❌']);
        } else {
            $customer = new Customer();
            $customer->first_name = $request->first_name;
            $customer->last_name = $request->last_name;
            $customer->email = $request->email;
            $customer->phone = $request->phone;
            $customer->save();

            $customerAddress = new CustomerAddress();
            $customerAddress->city = $request->city;
            $customerAddress->zip_code = $request->zip_code;
            $customerAddress->street = $request->street;
            $customerAddress->number = $request->number;
            $customerAddress->house_number = $request->house_number;
            $customerAddress->customer_id = $customer->id;
            $customerAddress->save();
            return response()->json(['success' => 'Record added successfully ✅']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        return view('customers.show')
            ->with('customer', $customer);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        return view('customers.edit')
            ->with('customer', $customer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Customer::where('id', $id)->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' =>  $request->phone,
        ]);

        CustomerAddress::where('customer_id', $id)->update([
            'city' => $request->city,
            'zip_code' => $request->zip_code,
            'street' => $request->street,
            'number' => $request->number,
            'house_number' => $request->house_number,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        CustomerAddress::where('customer_id', '=', $id)->delete();
        Customer::where('id', '=', $id)->delete();
    }

    // API 

    public function usersList()
    {
        return Customer::join('customer_address', 'customer_address.customer_id', '=', 'customer.id')->get();
    }

    public function userListFiltered($params)
    {
        return Customer::join('customer_address', 'customer_address.customer_id', '=', 'customer.id')
        ->where('first_name', 'like', '%'.$params.'%')
        ->orWhere('last_name', 'like', '%'.$params.'%')
        ->orWhere('phone', 'like', '%'.$params.'%')
        ->orWhere('street', 'like', '%'.$params.'%')
        ->orWhere('city', 'like', '%'.$params.'%')
        ->get();
    }

    public function userDetails($id)
    {
        return Customer::join('customer_address', 'customer_address.customer_id', '=', 'customer.id')->where('customer.id', '=', $id)->first();
    }

    public function businessesNearBy($id) {
        return DB::table('business')
        ->join('business_address', 'business_address.business_id', '=', 'business.id')
        ->join('customer_address', 'customer_address.zip_code', '=', 'business_address.zip_code')
        ->join('customer', 'customer.id', '=', 'customer_address.customer_id')
        ->where('customer.id', '=', $id)
        ->select('business.*')
        ->get()
        ->toJson();
    }
}
