<?php

namespace App\Http\Controllers;

use App\Rider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;

class RiderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $riders = Rider::all();

        return view('riders.index')
            ->with('riders', $riders);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('riders.create');
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
            'active' => 'integer|between:0,1',
            'phone' => 'string|max:45',
            'username' => 'string|max:45',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'One or more fields do not match the right type of data ❌']);
        } else {
            $rider = new Rider();
            $rider->first_name = $request->first_name;
            $rider->last_name = $request->last_name;
            $rider->active = $request->active;
            $rider->phone = $request->phone;
            $rider->username = $request->username;
            $rider->save();
            return response()->json(['success' => 'Record added successfully ✅']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Rider  $rider
     * @return \Illuminate\Http\Response
     */
    public function show(Rider $rider)
    {
        return view('riders.show')
            ->with('rider', $rider);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Rider  $rider
     * @return \Illuminate\Http\Response
     */
    public function edit(Rider $rider)
    {
        return view('riders.edit')
            ->with('rider', $rider);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Rider  $rider
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id)
    {
        Rider::where('id', $id)->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone' =>  $request->phone,
            'username' => $request->username,
            'active' => $request->active
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Rider  $rider
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Rider::where('id', '=', $id)->delete();
    }
}
