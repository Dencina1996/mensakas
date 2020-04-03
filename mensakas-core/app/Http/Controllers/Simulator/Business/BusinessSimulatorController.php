<?php

namespace App\Http\Controllers\Simulator\Business;

use App\Customer;
use App\CustomerAddress;
use App\Business;
use App\Comanda;
use App\ComandaProduct;
use App\Order;
use App\OrderStatus;
use App\Payment;
use Illuminate\Http\Request;
use DB;

class BusinessSimulatorController extends \App\Http\Controllers\Controller
{
    public function customerStore(Request $request)
    {
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
        $customerAddress->house_number = $request->door;
        $customerAddress->customer_id = $customer->id;
        $customerAddress->save();

        if($request->ajax()){
            $newCustomerAddress = DB::table('customer_address')->get()->last()->id;
            $customerId = DB::table('customer')->get()->last()->id;
            $orderId = DB::table('comanda')->get()->last()->id+1;
            return response()->json([
                'address_id' => $newCustomerAddress,
                'order_id' => $orderId,
                'customer_id' => $customerId
            ]);
        } else {
            return redirect()->route('simulator.comanda.businessesInZipCode', ['customer' => $customer, 'zip' => $request->zip_code]);
        }
    
    }

    public function getBusinessesByZip($zip)
    {
        return  Business::addSelect('*')
                ->join('business_address', 'business.id', '=', 'business_address.business_id')
                ->where('zip_code', '=', $zip)->get();
    }

    public function businessesInZipCode(Customer $customer, $zip)
    {
        $busisnesses = Business::addSelect('*')
            ->join('business_address', 'business.id', '=', 'business_address.business_id')
            ->where('zip_code', '=', $zip)->get();

        return view('simulators.business.businesses')
            ->with(['customer' => $customer, 'busisnesses' => $busisnesses]);
    }

    public function getMenus($id)
    {
        return  DB::table('product')
                ->where('business_id', '=', $id)
                ->leftJoin('description_translation', 'description_translation.product_description_id', '=', 'product.id')
                ->get();
    } 

    public function businessMenu(Customer $customer, Business $business)
    {
        return view('simulators.business.menu')->with(['customer' => $customer, 'business' => $business]);
    }

    public function saveOrder(Request $request)
    {

        

            $comanda = new Comanda();
            $comanda->address_id = $request->customer_address_id;
            $comanda->ticket_json = '{"business": {"name": "restaurante2", "address": "c/123"}, "customer": {"mail": "test@test.com", "address": "C/324"}, "products": [{"product": {"name": "hamburguesa", "price": "10", "extras": [{"product": {"name": "queso", "price": "1"}}, {"product": {"name": "tomate", "price": "1"}}]}}, {"product": {"name": "agua", "price": "1"}}]}';
            $comanda->save();

            $comandaProduct = new ComandaProduct();
            $comandaProduct->comanda_id = $request->command_id;
            $comandaProduct->product_id = $request->prod_id;
            $comandaProduct->quantity = 1;
            $comandaProduct->save();

            $orderStatus = new OrderStatus();
            $orderStatus->status_id = 1;
            $orderStatus->save();

            $payment = new Payment();
            $payment->amount = $request->total;
            $payment->save();

            $order = new Order();
            $order->order_status_id = $orderStatus->id;
            $order->payment_id = $payment->id;
            $order->comanda_id = $comanda->id;
            $order->save();

            return response()->json(['orderDoneId' => $orderStatus->id]);
        
        
    }

    public function pay(Order $order)
    {
        return view('simulators.business.pay')
            ->with(['order' => $order]);
    }

    public function makePaid(Order $order)
    {
        $order->orderStatus->status_id = 2;
        $order->push();

        return redirect()->route('simulator.comanda.orderStatus', ['order' => $order]);
    }

    public function orderStatus(Order $order, Request $request)
    {
        if ($request->ajax()) {
            $status = DB::table('order_status')->where('id', '=', $order->id)->value('status_id');
            return response()->json($status);
        } else {
            return view('simulators.business.status')->with(['order' => $order]);
        }
    }

    public function payCommand($id, Request $request) {
        DB::table('order_status')->where('id', '=', $id)->update([
            'status_id' => $request->status
        ]);
    }
}
