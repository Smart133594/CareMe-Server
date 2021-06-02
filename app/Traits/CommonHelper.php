<?php
namespace App\Traits;
use Illuminate\Support\Facades\Log;

trait CommonHelper
{
    public function sendCurlRequest($url,$type='get',$data=[], $headers=['application/json']){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        if($type=='POST')
        {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        }
        if(count($headers)>0)
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $result=curl_exec($ch);
        curl_close($ch);
    }

    public function sendThawaniRequest($url, $type, $data=[]){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER , true);
        curl_setopt($ch, CURLOPT_ENCODING, "");
        curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $type);
        if($type=='POST'){
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        }

        $secret_key = config('app.THAWANI_SECRET_KEY');

        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: application/json",
            "thawani-api-key:".$secret_key
        ]);

        $response = curl_exec($ch);
        $err = curl_error($ch);
        curl_close($ch);

        if ($err) {
           return $err;
        }
        return $response;
    }
}
