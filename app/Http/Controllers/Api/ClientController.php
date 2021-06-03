<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Arr;
use App\Mail\BookingMail;
use App\Mail\OrderingMail;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Service;
use App\Models\Product;
use App\Models\Vendor;
use App\Models\WishList;
use App\Models\City;
use App\Models\Department;
use App\Models\Worker;
use App\Models\Booking;
use App\Models\Ordering;
use App\Models\User;
use App\Models\Coupon;
use App\Models\Transaction;
use PDF;
use File;
use DB;
use App;
use Config;

use App\Traits\CommonHelper;

class ClientController extends Controller{
    use CommonHelper;

    public function __construct(){

    }

    public function getSearchItems(Request $request){
        $categories = Category::where('active', true)->orderBy('id')->get();
        $vendors = DB::table('vendors')
            ->leftJoin('categories', 'categories.id', '=', 'vendors.category_id')
            ->leftJoin('vendor_galleries', 'vendor_galleries.vendor_id', '=', 'vendors.id')
            ->where('categories.active', true)
            ->where('vendors.active', true)
            ->select('vendors.*', 'vendor_galleries.image')
            ->groupBy('vendors.id')
            ->orderBy('rating', 'desc')
            ->orderBy('id')
            ->get();

            $servicies = DB::table('services')
            ->leftJoin('departments', 'departments.id', '=', 'services.department_id')
            ->leftJoin('vendors', 'vendors.id', '=', 'departments.vendor_id')
            ->leftJoin('categories', 'categories.id', '=', 'vendors.category_id')
            ->where('categories.active', true)
            ->where('vendors.active', true)
            ->where('departments.active', true)
            ->where('services.active', true)
            ->orderBy('rating', 'desc')
            ->orderBy('id')
            ->select('services.*')
            ->get();

        $products = DB::table('products')
            ->leftJoin('departments', 'departments.id', '=', 'products.department_id')
            ->leftJoin('vendors', 'vendors.id', '=', 'departments.vendor_id')
            ->leftJoin('categories', 'categories.id', '=', 'vendors.category_id')
            ->where('categories.active', true)
            ->where('vendors.active', true)
            ->where('departments.active', true)
            ->where('products.active', true)
            ->select('products.*')
            ->orderBy('rating', 'desc')
            ->orderBy('id')
            ->get();

        $result = [
            'categories' => $categories,
            'vendors' => $vendors,
            'servicies'=>$servicies,
            'products'=>$products,
        ];
        return response()->json([
            'success'=>true,
            'data'=>$result
        ]);
    }
    // Banners
    public function getFrontData(Request $request){


        $today = date("Y-m-d") ;
        $rows = Banner::where(['active' => true])->whereDate('start_date', '<=', $today)->whereDate('expire_date', '>=', $today)->orderBy('id')->select('image')->get();
        $banners = $rows->pluck('image');
        $categories = Category::where('active', true)->orderBy('id')->get();
        $vendors = DB::table('vendors')
            ->select('vendors.*', 'vendor_galleries.image')
            ->leftJoin('categories', 'categories.id', '=', 'vendors.category_id')
            ->leftJoin('vendor_galleries', 'vendor_galleries.vendor_id', '=', 'vendors.id')
            ->where('categories.active', true)
            ->where('vendors.active', true)
            ->where('vendors.recommended', true)
            ->groupBy('vendors.id')
            ->orderBy('rating', 'desc')
            ->orderBy('id')
            ->take(20)
            ->get();

            $servicies = DB::table('services')
            ->leftJoin('departments', 'departments.id', '=', 'services.department_id')
            ->leftJoin('vendors', 'vendors.id', '=', 'departments.vendor_id')
            ->leftJoin('categories', 'categories.id', '=', 'vendors.category_id')
            ->where('categories.active', true)
            ->where('vendors.active', true)
            ->where('departments.active', true)
            ->where('services.active', true)
            ->where('services.recommended', true)
            ->orderBy('rating', 'desc')
            ->orderBy('id')
            ->select('services.*')
            ->take(20)
            ->get();
        $products = DB::table('products')
            ->leftJoin('departments', 'departments.id', '=', 'products.department_id')
            ->leftJoin('vendors', 'vendors.id', '=', 'departments.vendor_id')
            ->leftJoin('categories', 'categories.id', '=', 'vendors.category_id')
            ->where('categories.active', true)
            ->where('vendors.active', true)
            ->where('departments.active', true)
            ->where('products.active', true)
            ->where('products.recommended', true)
            ->orderBy('rating', 'desc')
            ->orderBy('id')
            ->select('products.*')
            ->take(20)
            ->get();

        $hot_servicies = Service::where([['discount_price', '>', 0], ['active', true]])->orderBy('discount_price', 'desc')->take(20)->get();
        $hot_products = Product::where([['discount_price', '>', 0], ['active', true]])->orderBy('discount_price', 'desc')->take(20)->get();

        $result = [
            'banners' => $banners,
            'categories' => $categories,
            'vendors' => $vendors,
            'servicies'=>$servicies,
            'products'=>$products,
            'hot_servicies'=>$hot_servicies,
            'hot_products'=>$hot_products
        ];
        return response()->json([
            'success'=>true,
            'data'=>$result
        ]);
    }

    public function getVendors(Request $request){

        $selected_cities = $request->selected_cities;
        $selected_categories = $request->selected_categories;

        $query = DB::table('vendors')
            ->leftJoin('vendor_galleries', 'vendor_galleries.vendor_id', '=', 'vendors.id')
            ->where('vendors.active', true);

        if(count($selected_cities)){
            $query = $query->leftJoin('cities', 'cities.id', '=', 'vendors.city_id')
                    ->whereIn('cities.id', $selected_cities);
        }

        if(count($selected_categories)){
            $query = $query->leftJoin('categories', 'categories.id', '=', 'vendors.category_id')
                    ->whereIn('categories.id', $selected_categories);
        }

        $vendors = $query->select('vendors.id', 'vendors.en_name', 'vendors.ar_name', 'vendors.rating', 'vendor_galleries.image')
            ->groupBy('vendors.id')
            ->orderBy('vendors.rating', 'desc')
            ->orderBy('vendors.id')
            ->get();

        return response()->json([
            'success'=>true,
            'data'=>$vendors
        ]);
    }

    public function getFilterData(Request $request){
        $categories = Category::where('active', true)->orderBy('id')->get();
        $cities = City::orderBy('id')->get();
        foreach ($categories as $category) {
            $vendors = $category->vendors;
            foreach ($vendors as $vendor) {
                $vendor->departments;
            }
        }

        $result = ['cities' => $cities, 'categories' => $categories];
        return response()->json([
            'success'=>true,
            'data'=>$result
        ]);
    }

    public function getVendor($vendor_id){
        $vendor = Vendor::find($vendor_id);
        $vendor->images;
        $vendor->city;
        $vendor->departments;

        $servicies = DB::table('services')
            ->leftJoin('departments', 'departments.id', '=', 'services.department_id')
            ->leftJoin('vendors', 'vendors.id', '=', 'departments.vendor_id')
            ->where('vendors.active', true)
            ->where('vendors.id', $vendor_id)
            ->where('departments.active', true)
            ->where('services.active', true)
            ->orderBy('rating', 'desc')
            ->orderBy('id')
            ->select('services.*')
            ->get();

        $products = DB::table('products')
            ->leftJoin('departments', 'departments.id', '=', 'products.department_id')
            ->leftJoin('vendors', 'vendors.id', '=', 'departments.vendor_id')
            ->where('vendors.active', true)
            ->where('vendors.id', $vendor_id)
            ->where('departments.active', true)
            ->where('products.active', true)
            ->orderBy('id')
            ->select('products.*')
            ->get();


        $result = ['vendor' => $vendor, 'servicies' => $servicies, 'products' => $products];

        return response()->json([
            'success'=>true,
            'data'=>$result
        ]);
    }

    public function getServicies(Request $request){
        $selected_cities = $request->selected_cities;
        $selected_categories = $request->selected_categories;
        $selected_pricies = $request->selected_pricies;
        $selected_vendors = $request->selected_vendors;
        $selected_departments = $request->selected_departments;
        $selected_discount = $request->selected_discount;

        $query = DB::table('services')
            ->where('services.active', true)
            ->leftJoin('departments', 'departments.id', '=', 'services.department_id')
            ->leftJoin('vendors', 'vendors.id', '=', 'departments.vendor_id')
            ->leftJoin('categories', 'categories.id', '=', 'vendors.category_id')
            ->where('departments.active', true)
            ->where('vendors.active', true)
            ->where('categories.active', true);

        if(count($selected_departments)){
            $query = $query->whereIn('departments.id', $selected_departments);
        }

        if(count($selected_vendors)){
            $query = $query->whereIn('vendors.id', $selected_vendors);
        }

        if(count($selected_cities)){
            $query = $query->leftJoin('cities', 'cities.id', '=', 'vendors.city_id')
                ->whereIn('cities.id', $selected_cities);
        }

        if(count($selected_categories)){
            $query = $query->whereIn('categories.id', $selected_categories);
        }

        if(count($selected_pricies)){
            $query = $query->whereBetween('services.price', $selected_pricies);
        }

        if(count($selected_discount)){
            $query = $query->whereBetween('services.discount_price', $selected_discount);
        }

        $servicies = $query->select('services.*')
            ->orderBy('services.rating', 'desc')
            ->orderBy('services.id')
            ->get();

        return response()->json([
            'success'=>true,
            'data'=>$servicies
        ]);
    }

    public function getProducts(Request $request){
        $selected_cities = $request->selected_cities;
        $selected_categories = $request->selected_categories;
        $selected_pricies = $request->selected_pricies;
        $selected_vendors = $request->selected_vendors;
        $selected_departments = $request->selected_departments;
        $selected_discount = $request->selected_discount;

        $query = DB::table('products')
            ->where('products.active', true)
            ->leftJoin('departments', 'departments.id', '=', 'products.department_id')
            ->leftJoin('vendors', 'vendors.id', '=', 'departments.vendor_id')
            ->leftJoin('categories', 'categories.id', '=', 'vendors.category_id')
            ->where('departments.active', true)
            ->where('vendors.active', true)
            ->where('categories.active', true);

        if(count($selected_departments)){
            $query = $query-> whereIn('departments.id', $selected_departments);
        }

        if(count($selected_vendors)){
            $query = $query-> whereIn('vendors.id', $selected_vendors);
        }

        if(count($selected_cities)){
            $query = $query->leftJoin('cities', 'cities.id', '=', 'vendors.city_id')
                ->whereIn('cities.id', $selected_cities);
        }

        if(count($selected_categories)){
            $query = $query->whereIn('categories.id', $selected_categories);
        }

        if(count($selected_pricies)){
            $query = $query->whereIn('products.price', $selected_pricies);
        }

        if(count($selected_discount)){
            $query = $query->whereIn('products.discount_price', $selected_discount);
        }

        $servicies = $query->select('products.*')
            ->orderBy('products.rating', 'desc')
            ->orderBy('products.id')
            ->get();

        return response()->json([
            'success'=>true,
            'data'=>$servicies
        ]);
    }

    public function addWish(Request $request){
        $user = Auth::user();
        $all = $request->all();
        $all['user_id'] = $user->id;
        $wish = WishList::create($all);

        return response()->json([
            'success'=>true,
            'data'=> $wish
        ]);
    }

    public function removeWish(Request $request){
        $user = Auth::user();
        $all = $request->all();
        $all['user_id'] = $user->id;
        WishList::where($all)->delete();
        return response()->json([
            'success'=>true,
        ]);
    }

    public function getWishes(Request $request){
        $user = Auth::user();

        $servicies = DB::table('wish_lists')
            ->leftJoin('services', 'services.id', 'wish_lists.service_id')
            ->where('services.active', true)
            ->get();

        $products = DB::table('wish_lists')
            ->leftJoin('products', 'products.id', 'wish_lists.product_id')
            ->where('products.active', true)
            ->get();

        $result = ['servicies' => $servicies, 'products' => $products];

        return response()->json([
            'success'=>true,
            'data'=>$result
        ]);
    }

    public function getService($service_id){
        $service = DB::table('services')
        ->leftJoin('departments', 'departments.id', 'services.department_id')
        ->leftJoin('vendors', 'vendors.id', 'departments.vendor_id')
        ->where('services.id', $service_id)
        ->where('services.active', true)
        ->select('services.*', 'vendors.en_address', 'vendors.ar_address', 'vendors.lat', 'vendors.lng', 'vendors.phone')
        ->first();

        if($service){
            $department = Department::find($service->department_id);
            $vendor = Vendor::find($department->vendor_id);
            $offday = $vendor->offday;
            $holidays = $vendor->holidays;
            $off_days = [];

            if($offday){
                $off_days = $offday->off_days;
            }

            $starting_time = $service->starting_time;
            $ending_time = $service->ending_time;

            $starting_time = strtotime($starting_time);
            $ending_time = strtotime($ending_time);

            $starting_hours = (int)(date("H", $starting_time));
            $starting_minutes = (int)(date("i", $starting_time));
            $starting_minutes = $starting_hours*60 + $starting_minutes;

            $ending_hours = (int)(date("H", $ending_time));
            $ending_minutes = (int)(date("i", $ending_time));
            $ending_minutes = $ending_hours*60 + $ending_minutes;

            $buffering_minutes = (int)$service->buffering_time;
            $duration_minutes = (int)$service->duration;
            $times = [];
            $index = 1;
            for($time = $starting_minutes; $time <= $ending_minutes;){
                $hours = floor($time / 60);
                $minutes = $time % 60;
                $at_time['from_time'] = str_pad($hours, 2, "0", STR_PAD_LEFT).":".str_pad($minutes, 2, "0", STR_PAD_LEFT).":00";

                $time += $duration_minutes;
                $time += $buffering_minutes;
                $hours = floor($time / 60);
                $minutes = $time % 60;
                $at_time['to_time'] = str_pad($hours, 2, "0", STR_PAD_LEFT).":".str_pad($minutes, 2, "0", STR_PAD_LEFT).":00";
                $at_time['id'] = $index;
                if($time <= $ending_minutes){
                    array_push($times, $at_time);
                    $index ++ ;
                }
            }

            $service->offdays = $off_days;
            $service->holidays = $holidays;
            $service->times = $times;

            $workers_temp = Worker::get();
            $workers = [];
            foreach ($workers_temp as $worker) {
                $at_service = $worker->servicies;
                if(in_array($service->id, $at_service)){
                    array_push($workers, $worker);
                }
            }
            $service->workers = $workers;
        }

        return response()->json([
            'success'=>true,
            'data'=>$service
        ]);
    }

    public function getProduct($product_id){
        $product = DB::table('products')
        ->leftJoin('departments', 'departments.id', 'products.department_id')
        ->leftJoin('vendors', 'vendors.id', 'departments.vendor_id')
        ->where('products.id', $product_id)
        ->where('products.active', true)
        ->select('products.*', 'vendors.en_address', 'vendors.ar_address', 'vendors.lat', 'vendors.lng', 'vendors.phone')
        ->first();

        return response()->json([
            'success'=>true,
            'data'=>$product
        ]);
    }

    // Apply Coupon
    public function checkCoupon(Request $request){
        $code = $request->coupon;
        $type = $request->type;
        $types = ['cart', $type];
        $today = date("Y-m-d");

        $coupon = Coupon::where('code', $code)
                    ->whereIn('type', $types)
                    ->where('available', true)
                    ->whereDate('expire', '>=', $today)
                    ->first();

        if($coupon){
            return response()->json([
                'success'=>true,
                'data'=>$coupon->percent,
            ]);
        }

        return response()->json([
            'success'=>false,
        ]);
    }

    public function getCouponPrice($sub_amount, $code, $type){
        $types = ['cart', $type];
        $today = date("Y-m-d");
        $coupon = Coupon::where('code', $code)
                    ->whereIn('type', $types)
                    ->where('available', true)
                    ->whereDate('expire', '>=', $today)
                    ->first();

        $result = NULL;
        if($coupon){
            $coupon_amount = ($sub_amount * $coupon->percent)%100;
            $result['id'] = $coupon->id;
            $result['coupon_amount'] = $coupon_amount;
            $result['coupon_percent'] = $coupon->percent;
        }
        return $result;
    }

    //Booking
    public function bookingWithInsurance(Request $request){
        $service_id = $request->service_id;
        $all = $request->all();
        $service = Service::find($service_id);
        $auto_accept = $service->auto_confirm;
        $price = $service->price;
        $quantity = $request->quantity;
        $times = $request->times;
        $code = $request->coupon;
        $type = $request->type;
        
        $sub_amount = $price * $quantity * count($times);
        $tax_amount = 0;
        if($service->tax > 0){
            $tax_amount = ($sub_amount * $service->tax)/100;
        }
        $coupon_amount = 0;
        $all['coupon_id'] = -1;
        
        if($code != ""){
            $coupon_result = $this->getCouponPrice($sub_amount, $code, $type);
            if($coupon_result == NULL){
                return response()->json([
                    'success'=>false,
                ]);
            }
            $coupon_amount = $coupon_result['coupon_amount'];
            $all['coupon_id'] = $coupon_result['id'];

            $coupon = Coupon::find($coupon_result['id']);
            $coupon->available = false;
            $coupon->save();
        }

        $amount = $sub_amount + $tax_amount - $coupon_amount;
        $image = $request->image;
        $image1 = $request->image1;
        // $lang = $request->lang;
        $lang = 'en';

        if ($image && str_contains($image, 'data:image')) {
            $data64 = explode(',', $image)[1];
            $file_name = 'bookings_0'.time(). '.png';
            $path = public_path() . "/uploads/bookings/";
            $uploadPath = $path. $file_name;
            if(!File::isDirectory($path)){
                File::makeDirectory($path, 0777, true, true);
            }
            $data64 = base64_decode($data64);
            if (file_put_contents($uploadPath, $data64)) {
                $image = $file_name;
            } else {
                $image = null;
            }
        }else{
            $image = null;
        }

        if ($image1 && str_contains($image1, 'data:image')) {
            $data64 = explode(',', $image1)[1];
            $file_name = 'bookings_1'.time(). '.png';
            $path = public_path() . "/uploads/bookings/";
            $uploadPath = $path. $file_name;
            if(!File::isDirectory($path)){
                File::makeDirectory($path, 0777, true, true);
            }
            $data64 = base64_decode($data64);
            if (file_put_contents($uploadPath, $data64)) {
                $image1 = $file_name;
            } else {
                $image1 = null;
            }
        }else{
            $image1 = null;
        }

        $user = Auth::user();

        $transaction_data['amount'] = $amount;
        $transaction_data['payment_status'] = 'unpaid';
        $transaction = Transaction::create($transaction_data);

        $all['type'] = 'insurance';
        $all['transaction_id'] = $transaction->id;
        $all['state'] = 'pending';
        $all['user_id'] = $user->id;
        $all['image'] = $image;
        $all['image1'] = $image1;

        $item['title'] = $lang == 'ar' ? $service->ar_name : $service->en_name;
        $item['price'] = number_format($service->price*count($times), 2, '.', '');
        $item['quantity'] = $quantity;
        $item['price_sub'] =  number_format($sub_amount, 2, '.', '');

        $items = [];
        array_push($items, $item);

        $data['full_name'] = $user->full_name;
        $data['email'] = $user->email;
        $data['phone'] = $user->phone;
        $nowDate = date("Y-m-d H:i:s");
        $data['date'] = $nowDate;
        $data['total'] = number_format($amount, 2, '.', '');
        $data['sub_total'] = number_format($sub_amount, 2, '.', '');
        $data['tax'] = number_format($tax_amount, 2, '.', '');
        $data['coupon'] = number_format($coupon_amount, 2, '.', '');
        $data['amount_paid'] = '0.00';
        $data['items'] = $items;

        App::setlocale($lang);
        $pdf = PDF::loadView('invoicies.invoice', $data);
        $pdf_name = 'uploads/invoicies/'.time()."_invoice.pdf";
        $path = public_path() . "/uploads/invoicies/";
        if(!File::isDirectory($path)){
            File::makeDirectory($path, 0777, true, true);
        }
        $pdf->save($pdf_name);
        $all['invoice'] = $pdf_name;

        if($auto_accept){
            $all['state'] = 'accepted';
        }
        $booking = Booking::create($all);

        $booking = DB::table('bookings')
        ->leftJoin('services', 'services.id', "bookings.service_id")
        ->leftJoin('users', 'users.id', "bookings.user_id")
        ->leftJoin('transactions', 'transactions.id', "bookings.transaction_id")
        ->where('bookings.id', $booking->id)
        ->select('bookings.*', "services.en_name", "services.ar_name", "services.price", "users.full_name", "users.phone",
                 "users.email", "transactions.amount", "transactions.payment_status")
        ->first();

        $this->sendBookingMailWithPDF($booking);
        return response()->json([
            'success'=>true,
        ]);
    }

    public function getServiceSession(Request $request){
        $cancel_url = $request->cancel_url;
        $success_url = $request->success_url;
        $service_id = $request->service_id;
        $worker_id = $request->worker_id;
        $date = $request->date;
        $times = $request->times;
        $quantity = $request->quantity;
        $code = $request->coupon;
        $type = $request->type;
       // $lang = $request->lang;
        $lang = 'en';
        App::setlocale($lang);

        $service = Service::find($service_id);
        $price = $service->price;
        $auto_accept = $service->auto_confirm;

        $sub_amount = $price * count($times);
        $tax_amount = 0;
        if($service->tax > 0){
            $tax_amount = ($sub_amount * $service->tax)/100;
        }

        $coupon_amount = 0;
        $coupon_id = -1;
        if($code != ""){
            $coupon_result = $this->getCouponPrice($sub_amount, $code, $type);
            if($coupon_result == NULL){
                return response()->json([
                    'success'=>false,
                ]);
            }
            $coupon_amount = $coupon_result['coupon_amount'];
            $coupon_id = $coupon_result['id'];
        }

        $amount = $sub_amount + $tax_amount - $coupon_amount;

        $user = Auth::user();
        $fields['client_reference_id'] = $user->id;
        $fields['customer_id'] = $user->customer_id;

        $products = [];
        $product['name'] = $service->en_name."(+ tax - coupon)";
        $product['unit_amount'] = $amount *1000;
        $product['quantity'] = $quantity;
        array_push($products, $product);
        $fields['products'] = $products;
        $fields['success_url'] = $success_url;
        $fields['cancel_url'] = $cancel_url;

        $metadata['user_id'] = $user->id; 
        $metadata['type'] = "service"; 
        $metadata['coupon_id'] = $coupon_id; 
        $metadata['date'] = $date; 
        $metadata['quantity'] = $quantity; 
        $metadata['service_id'] = $service_id; 
        $metadata['worker_id'] = $worker_id; 
        $stringTimes = json_encode($times);
        $stringTimes = str_replace("\"", "\'", $stringTimes);

        $metadata['times'] = $stringTimes;
        $fields['metadata'] = $metadata;
        $secret_key = config('app.THAWANI_SECRET_KEY');

        $stringFields = json_encode($fields);
        $stringFields = str_replace("\'", "'", $stringFields);

        $baseUrl = config('app.THAWANI_BASE_URL');
        $feedback = $this->sendThawaniRequest($baseUrl.'/checkout/session', "POST", $stringFields);
        $session_id = "";
      
        if(!is_null($feedback)){
            $json = json_decode($feedback, true);
            if($json['success']){
                $session_id = $json['data']['session_id'];
            }else{
                return response()->json([
                    'success'=>false,
                    'data'=>$feedback
                ]);
            }
        }else{
            return response()->json([
                'success'=>false,
            ]);
        }
        return response()->json([
            'success'=> true,
            'data'=>$session_id
        ]);
    }

    public function refundPayment($payment_id){
        $baseUrl = config('app.THAWANI_BASE_URL');
        $user = Auth::user();
        $fields['payment_id'] = $payment_id;
        $fields['reason'] = "Cancel by client";
        $metadata['user_id'] = $user->id;
        $fields['metadata'] = $metadata;
        $feedback = $this->sendThawaniRequest($baseUrl.'/refunds', "POST", $stringFields);
        return $feedback;
    }

    public function cancelBooking(Request $request){
        $id = $request->id;
        $booking = Booking::find($id);
        $feedback = NULL;
        if($booking->state == "pending" || $booking->state == "rejected"){
            $transaction = $booking->transaction;
            if($booking->type == "card"){
                if($booking->state == "pending" && $transaction->payment_status == 'paid'){
                    if($booking->payment_id){
                        $feedback = $this->refundPayment($transaction->$payment_id);
                    }
                }
            }else{
                File::delete(public_path() . "/uploads/bookings/".$booking->image);
                File::delete(public_path() . "/uploads/bookings/".$booking->image1);
            }
            $transaction->delete();
            $booking->delete();
            return response()->json([
                'success'=>true,
                'data'=> $feedback
            ]);
        }else{
            return response()->json([
                'success'=>false,
                'data'=>$feedback
            ]);
        }
    }

    public function getMyBookings(Request $request){
        $user = Auth::user();
        $bookings = DB::table('bookings')
        ->leftJoin('services', 'services.id', "bookings.service_id")
        ->leftJoin('users', 'users.id', "bookings.user_id")
        ->leftJoin('workers', 'workers.id', "bookings.worker_id")
        ->leftJoin('transactions', 'transactions.id', "bookings.transaction_id")
        ->where('users.id', $user->id)
        ->select('bookings.*', "services.en_name", "services.ar_name", "services.price", "workers.full_name", 
            "workers.image as worker_image", "transactions.payment_id", "transactions.amount", "transactions.payment_status")
        ->orderBy('bookings.id', 'desc')
        ->get();

        return response()->json([
            'success'=>true,
            'data'=>$bookings,
        ]);
    }

    ///Ordering
    public function getCarts(Request $request){
        $carts = $request->all();

        $products = [];
        foreach ($carts as $cart) {
            $product = Product::find($cart['id']);
            $product['quantity'] = $cart['quantity'];
            $department = Department::find($product->id);
            $vendor = Vendor::find($department->vendor_id);
            $product['vendor_id'] = $vendor->id;
            $product['vendor_en_name'] = $vendor->en_name;
            $product['vendor_ar_name'] = $vendor->ar_name;

            if($product['active']){
                array_push($products, $product);
            }
        }

        return response()->json([
            'success'=>true,
            'data'=> $products
        ]);
    }

    public function getProductSession(Request $request){
        $cancel_url = $request->cancel_url;
        $success_url = $request->success_url;
        $carts = $request->carts;
        $code = $request->coupon;
        $type = $request->type;
        $vendor_id = $request->vendor_id;
       // $lang = $request->lang;
        $lang = 'en';
        App::setlocale($lang);

        $products = [];
        $meta_products = [];

        $coupon_id = -1;
        $coupon_percent = 0;
        if($code != ""){
            $coupon_result = $this->getCouponPrice(0, $code, $type);
            if($coupon_result == NULL){
                return response()->json([
                    'success'=>false,
                ]);
            }
            $coupon_id = $coupon_result['id'];
            $coupon_percent = $coupon_result['coupon_percent'];
        }

        foreach ($carts as $cart) {
            $id = $cart['id'];
            $quantity = $cart['quantity'];
            $product = Product::find($id);
            if($product){
                $price = $product->price;
                $tax = ($price * $product->tax)/100;
                $coupon_amount = ($price * $coupon_percent)/100;

                $item['id'] = $id;
                $item['name'] = $product->en_name."(+ tax -coupon)";
                $item['unit_amount'] = ($price + $tax - $coupon_amount)*1000;
                $item['quantity'] = $quantity;

                $item_meta['id'] = $id;
                $item_meta['quantity'] = $quantity;
                array_push($products, $item);
                array_push($meta_products, $item_meta);
            }
        }


        $user = Auth::user();
        $fields['client_reference_id'] = $user->id;
        $fields['customer_id'] = $user->customer_id;

        $fields['products'] = $products;
        $fields['success_url'] = $success_url;
        $fields['cancel_url'] = $cancel_url;

        $metadata['user_id'] = $user->id; 
        $metadata['type'] = "product"; 
        $metadata['coupon_id'] = $coupon_id; 
        $metadata['vendor_id'] = $vendor_id; 
       
        $stringCarts = json_encode($meta_products);
        $stringCarts = str_replace("\"", "\'", $stringCarts);

        $metadata['carts'] = $stringCarts;
        $fields['metadata'] = $metadata;

        $stringFields = json_encode($fields);
        $stringFields = str_replace("\'", "'", $stringFields);

        $baseUrl = config('app.THAWANI_BASE_URL');
        $feedback = $this->sendThawaniRequest($baseUrl.'/checkout/session', "POST", $stringFields);
        $session_id = "";
        
        if(!is_null($feedback)){
            $json = json_decode($feedback, true);
            if($json['success']){
                $session_id = $json['data']['session_id'];
            }else{
                return response()->json([
                    'success'=>false,
                    'data'=>$feedback
                ]);
            }
        }else{
            return response()->json([
                'success'=>false,
            ]);
        }
        return response()->json([
            'success'=> true,
            'data'=>$session_id
        ]);
    }

    public function getMyOrders(Request $request){
        $user = Auth::user();
        $orderings = DB::table('orderings')
        ->leftJoin('users', 'users.id', "orderings.user_id")
        ->leftJoin('transactions', 'transactions.id', "orderings.transaction_id")
        ->where('users.id', $user->id)
        ->select('orderings.*', "transactions.payment_id", "transactions.amount", "transactions.payment_status")
        ->orderBy('orderings.id', 'desc')
        ->get();

        foreach ($orderings as $ordering) {
            $carts = json_decode($ordering->carts, true);
            $products = [];
            foreach ($carts as $cart) {
                $product = Product::find($cart['id']);
                $product->quantity = $cart['quantity'];
                array_push($products, $product);
            }
            $ordering->carts = $products;
        }

        return response()->json([
            'success'=>true,
            'data'=>$orderings,
        ]);
    }

    public function paymentResult(Request $request){
        $webhook = $request->data;
        $meta = $webhook['metadata'];
        $payment_status = $webhook['payment_status'];
        $event_type = $webhook['event_type'];
        if($event_type == 'checkout.completed'){
            $type = $meta['type'];
            if($type == 'service'){
                $this->makeBooking($meta, $payment_status);
            }else{
                $this->makeOrdering($meta, $payment_status);
            }
        }
       
        return response()->json([
            'success'=> true,
        ]);
    }

    public function makeBooking($meta, $payment_status){
        $user_id = $meta['user_id'];
        $type = $meta['type'];
        $coupon_id = $meta['coupon_id'];
        $date = $meta['date'];
        $quantity = $meta['quantity'];
        $service_id = $meta['service_id'];
        $worker_id = $meta['worker_id'];
        $times = $meta['times'];
        $times = str_replace("'", "\"", $times);
        $times = json_decode($times, true);
        $lang = 'en';

        $service = Service::find($service_id);
        $auto_accept = $service->auto_confirm;
        $price = $service->price;

        $sub_amount = $price * $quantity * count($times);
        $tax_amount = 0;
        if($service->tax > 0){
            $tax_amount = ($sub_amount * $service->tax)/100;
        }
        $coupon_amount = 0;
        if($coupon_id != "-1"){
            $coupon = Coupon::find($coupon_id);
            if($coupon){
                $coupon_amount = ($sub_amount * $coupon->percent)%100;
                $coupon->available = false;
                $coupon->save();
            }
        }

        $amount = $sub_amount + $tax_amount - $coupon_amount;

        $item['title'] = $lang == 'ar' ? $service->ar_name : $service->en_name;
        $item['price'] = number_format($service->price*count($times), 2, '.', '');
        $item['quantity'] = $quantity;
        $item['price_sub'] =  number_format($sub_amount, 2, '.', '');

        $items = [];
        array_push($items, $item);

        $user = User::find($user_id);
        $data['full_name'] = $user->full_name;
        $data['email'] = $user->email;
        $data['phone'] = $user->phone;
        $nowDate = date("Y-m-d H:i:s");
        $data['date'] = $nowDate;
        $data['total'] = number_format($amount, 2, '.', '');
        $data['sub_total'] = number_format($sub_amount, 2, '.', '');
        $data['tax'] = number_format($tax_amount, 2, '.', '');
        $data['coupon'] = number_format($coupon_amount, 2, '.', '');
        $data['amount_paid'] = '0.00';
        $data['items'] = $items;

        App::setlocale($lang);
        $pdf = PDF::loadView('invoicies.invoice', $data);
        $pdf_name = 'uploads/invoicies/'.time()."_invoice.pdf";
        $path = public_path() . "/uploads/invoicies/";
        if(!File::isDirectory($path)){
            File::makeDirectory($path, 0777, true, true);
        }
        $pdf->save($pdf_name);

        $transaction_data['amount'] = $amount;
        $transaction_data['payment_status'] = $payment_status;
        $transaction = Transaction::create($transaction_data);

        $all['user_id'] = $user_id;
        $all['transaction_id'] = $transaction->id;
        $all['service_id'] = $service_id;
        $all['date'] = $date;
        $all['times'] = $times;
        $all['quantity'] = $quantity;
        $all['worker_id'] = $worker_id;
        $all['coupon_id'] = $coupon_id;
        $all['type'] = 'card';
        $all['state'] = 'pending';
        if($auto_accept){
            $all['state'] = 'accepted';
        }
        $all['invoice'] = $pdf_name;
        $booking = Booking::create($all);

        $booking = DB::table('bookings')
        ->leftJoin('services', 'services.id', "bookings.service_id")
        ->leftJoin('users', 'users.id', "bookings.user_id")
        ->leftJoin('transactions', 'transactions.id', "bookings.transaction_id")
        ->where('bookings.id', $booking->id)
        ->select('bookings.*', "services.en_name", "services.ar_name", "services.price", "users.full_name", "users.phone",
                 "users.email", "transactions.amount", "transactions.payment_status")
        ->first();

        $this->sendBookingMailWithPDF($booking);
    }

    public function makeOrdering($meta, $payment_status){
        $user_id = $meta['user_id'];
        $type = $meta['type'];
        $coupon_id = $meta['coupon_id'];
        $vendor_id = $meta['vendor_id'];
        $carts = $meta['carts'];
        $carts = str_replace("'", "\"", $carts);
        $carts = json_decode($carts, true);
        $lang = 'en';
        $items = [];
        $sub_amount = 0;
        $tax_amount = 0;

        foreach ($carts as $cart) {
            $id = $cart['id'];
            $quantity = $cart['quantity'];
            $product = Product::find($id);
            if($product){
                $price_sub = $product->price * $quantity;
                $tax = ($price_sub * $product->tax)/100;
                $item['title'] = $lang == 'ar' ? $product->ar_name : $product->en_name;
                $item['price'] = number_format($product->price, 2, '.', '');
                $item['quantity'] = $quantity;
                $item['price_sub'] =  number_format($price_sub, 2, '.', '');
                array_push($items, $item);
                $sub_amount += $price_sub;
                $tax_amount += $tax;
            }
        }

        $coupon_amount = 0;
        if($coupon_id != "-1"){
            $coupon = Coupon::find($coupon_id);
            if($coupon){
                $coupon_amount = ($sub_amount * $coupon->percent)%100;
                $coupon->available = false;
                $coupon->save();
            }
        }

        $total_amount = $sub_amount + $tax_amount - $coupon_amount;

        $user = User::find($user_id);
        $data['full_name'] = $user->full_name;
        $data['email'] = $user->email;
        $data['phone'] = $user->phone;
        $nowDate = date("Y-m-d H:i:s");
        $data['date'] = $nowDate;
        $data['total'] = number_format($total_amount, 2, '.', '');
        $data['sub_total'] = number_format($sub_amount, 2, '.', '');
        $data['tax'] = number_format($tax_amount, 2, '.', '');
        $data['coupon'] = number_format($coupon_amount, 2, '.', '');
        $data['amount_paid'] = '0.00';
        $data['items'] = $items;

        $pdf = PDF::loadView('invoicies.invoice', $data);
        $pdf_name = 'uploads/invoicies/'.time()."_invoice.pdf";
        $path = public_path() . "/uploads/invoicies/";
        if(!File::isDirectory($path)){
            File::makeDirectory($path, 0777, true, true);
        }
        $pdf->save($pdf_name);

        $transaction_data['amount'] = $total_amount;
        $transaction_data['payment_status'] = $payment_status;
        $transaction = Transaction::create($transaction_data);

        $all['user_id'] = $user_id;
        $all['transaction_id'] = $transaction->id;
        $all['vendor_id'] = $vendor_id;
        $all['carts'] =  $carts;
        $all['invoice'] = $pdf_name;
        $all['state'] = 'accepted';

        $ordering = Ordering::create($all);
        $ordering = DB::table('orderings')
            ->leftJoin('users', 'users.id', "orderings.user_id")
            ->where('orderings.id', $ordering->id)
            ->leftJoin('transactions', 'transactions.id', "orderings.transaction_id")
            ->select('orderings.*', "users.full_name", "users.phone", "users.email", "transactions.amount", "transactions.payment_status")
            ->first();
        $this->sendOrderingMailWithPDF($ordering);
    }

    public function sendBookingMail($booking){
        Mail::to($booking->email)->send(new BookingMail($booking));
    }

    public function sendBookingMailWithPDF($booking){
        Mail::to($booking->email)->send(new BookingMail($booking, $booking->invoice));
    }

    public function sendOrderingMailWithPDF($ordering){
        Mail::to($ordering->email)->send(new OrderingMail($ordering, $ordering->invoice));
    }
}
