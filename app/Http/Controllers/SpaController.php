<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;
use PDF;
use Route;
use File;

class SpaController extends Controller
{
    public function index(Request $request){
        $url = \Request::getRequestUri();
        if($url == "/paymentResult"){
            $this->paymentResult($request);
        }else{
            return view('index');
        }
    }

    public function invoice(){
        App::setlocale('en');
        $pdf = PDF::loadView('invoicies.invoice');
        $pdf->save('uploads/invoicies/' ."first_pdf.pdf");
        return view('invoicies.invoice');
    }

    public function paymentResult($request){
        $path = public_path() . "/uploads/webhooks/";
        $filePath = $path."webhook.txt";
        if(!File::isDirectory($path)){
            File::makeDirectory($path, 0777, true, true);
        }
        $all = $request->all();
        $fp = fopen($filePath,"wb");
        fwrite($fp, json_encode($all));
        fclose($fp);
    }
}
