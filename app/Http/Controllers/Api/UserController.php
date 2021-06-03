<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Verification;
use App\Models\WishList;
use DB;
use Twilio\Rest\Client;
use App\Traits\CommonHelper;

class UserController extends Controller{
    use CommonHelper;
    public function makeRandomString(){
        return Str::random();
    }

    public function makeRandomNumber(){

        return rand(100000,999999);
    }

    public function sendCode2PhoneWithTwilio($phone) {
        $randomNumber = $this->makeRandomNumber();
        $sid    = "ACc319cc8cfa061c138822d1c919d97ba9";
        $token  = "c142a97851e4681f4a43c7c815fe0ac1";
        $twilio = new Client($sid, $token);
        $message = $twilio->messages
            ->create($phone, // to
                    array(
                        "messagingServiceSid" => "MGf0666bf871af98403c71568ac653c139",
                        "body" => "<#> Welcome to AwsomeProject. Your verification code is :".$randomNumber."\nMrpzuH/0SQ/"
                    )
            );
        return $randomNumber;
    }

    public function sendCode2PhoneWithNexMo($phone) {
        try {
            $randomNumber = $this->makeRandomNumber();
            $basic  = new \Nexmo\Client\Credentials\Basic("4228b62e", "aNN21mqPwYTSFH4b");
            $client = new \Nexmo\Client($basic);
            $message = "<#> Welcome to CareMe System. Your verification code is :".$randomNumber."\nMrpzuH/0SQ/";
            $message = $client->message()->send([
                'to' => $phone,
                'from' => 'CareMe System',
                'text' => $message
            ]);
            return $randomNumber;
        } catch (Exception $e) {
            return NULL;
        }

    }

    public function sendUrl2Email($email) {
        //send to url to email

        //end
        return true;
    }

    public function phoneVerification(Request $request){
        $phone = $request->phone;
        $forgot = $request->forgot;
        $email = $request->email;

        if($forgot){
            $iCount = User::where(['phone' => $phone])->get()->count();
            if($iCount == 0){
                return response()->json([
                    'success'=> false,
                ]);
            }
        }else{
            $iCount = User::where(['phone' => $phone])->orWhere(['email' => $email])->get()->count();
            if($iCount > 0){
                return response()->json([
                    'success'=> false,
                ]);
            }
        }

        $sentCode = $this->sendCode2PhoneWithNexMo($phone);
        if($sentCode){
            $verification = Verification::create(['code'=>$sentCode]);
            return response()->json([
                'success'=>true,
                'verification_id' => $verification->id
            ]);
        }
        return response()->json([
            'success'=>false,
        ]);
    }

    public function checkVerify(Request $request){
        $verification_id = $request->verification_id;
        if($verification_id){
            $verification = Verification::find($verification_id);
            if($verification){
                $verify_code = $request->verify_code;
                if($verification->code == $verify_code){
                    return response()->json([
                        'success'=>true,
                    ]);
                }
            }
        }
        return response()->json([
            'success'=>false,
        ]);
    }

    public function signup(Request $request){
        $email = $request->email;
        $phone = $request->phone;
        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $avatar = $request->avatar;
        $password = $request->password;

        $check = User::where('phone', $phone)->get()->count();
        if($check){
            return response()->json([
                'success'=>false,
            ]);
        }

        $check = User::where('email', $email)->get()->count();
        if($check){
            return response()->json([
                'success'=>false,
            ]);
        }

        if ($avatar != '') {
            $data64 = explode(',', $avatar)[1];
            $file_name = 'avatar'.time(). '.png';
            $path = public_path() . "/uploads/avatars/";
            $uploadPath = $path. $file_name;

            if(!File::isDirectory($path)){
                File::makeDirectory($path, 0777, true, true);
            }
            $data64 = base64_decode($data64);
            if (file_put_contents($uploadPath, $data64)) {
                $avatar = $file_name;
            } else {
                $avatar = null;
            }
        }

        $all['full_name'] = $first_name . $last_name;
        $all['first_name'] = $first_name;
        $all['last_name'] = $last_name;
        if($avatar)
            $all['avatar'] = $avatar;
        $all['email'] = $email;
        $all['phone'] = $phone;
        $all['phone_verified_at'] = now();
        $all['role'] = 'client';
        $all['active'] = true;
        $all['password'] = bcrypt($password);

        $fields['client_customer_id'] = $phone;
        $baseUrl = config('app.THAWANI_BASE_URL');
        $feedback = $this->sendThawaniRequest($baseUrl.'/customers', "POST", json_encode($fields));
        if(!is_null($feedback)){
            $feedback = json_decode($feedback, true);
            $all['customer_id'] = $feedback['data']['id'];
        }else{
            return response()->json([
                'success'=>false,
            ]);
        }

        User::create($all);
        return response()->json([
            'success'=>true,
        ]);
    }

    public function signin(Request $request){
        $phone = $request->phone;
        $password = $request->password;

        if (Auth::attempt(['phone' => $phone, 'password' => $password, 'active' => true,])) {
            $user = Auth::user();
            // DB::table('oauth_access_tokens')->where('user_id', $user->id)->delete();
            $token = $user->createToken($user->id)->accessToken;
            $user->token = $token;
            $user->wishes;
            return response()->json([
                'success'=>true,
                "data" => $user,
            ]);
        }

        return response()->json([
            'success'=>false,
            'data'=>$request->all()
        ]);
    }

    public function resetPassword(Request $request){
        $phone = $request->phone;
        $password = $request->password;
        $user = User::where('phone', $phone)->first();
        $user->password = bcrypt($password);
        $user->save();
        return response()->json([
            'success'=>true,
        ]);
    }
}
