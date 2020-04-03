<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class CommandSimController extends Controller
{
    public function getBusinesses($zip)
    {
    	return DB::table('business')
    	->join('business_address', 'business_address.business_id', '=', 'business.id')
    	->where('business_address.zip_code', '=', $zip)
    	->select('business.*')
    	->addSelect('business_address.*')
    	->get();
    }
}
