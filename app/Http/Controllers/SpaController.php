<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;
use PDF;

class SpaController extends Controller
{
    public function index(){
        return view('index');
    }

    public function invoice(){
        App::setlocale('en');
        $pdf = PDF::loadView('invoicies.invoice');
        $pdf->save('uploads/invoicies/' ."first_pdf.pdf");
        return view('invoicies.invoice');
    }
}
