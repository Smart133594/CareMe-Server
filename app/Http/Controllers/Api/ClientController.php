<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

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
use App\Models\Coupon;
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
            ->take(5)
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
            ->take(10)
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
            ->take(10)
            ->get();

        $hot_servicies = Service::where([['discount_price', '>', 0], ['active', true]])->orderBy('discount_price', 'desc')->take(24)->get();
        $hot_products = Product::where([['discount_price', '>', 0], ['active', true]])->orderBy('discount_price', 'desc')->take(24)->get();

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

    public function getCarts(Request $request){
        $carts = $request->all();

        $products = [];
        foreach ($carts as $cart) {
            $product = Product::find($cart['id']);
            $product['quantity'] = $cart['quantity'];
            if($product['active']){
                array_push($products, $product);
            }
        }

        return response()->json([
            'success'=>true,
            'data'=> $products
        ]);
    }

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
        if($code != ""){
            $coupon_result = $this->getCouponPrice($sub_amount, $code, $type);
            if($coupon_result == NULL){
                return response()->json([
                    'success'=>false,
                ]);
            }
            $coupon_amount = $coupon_result['coupon_amount'];
            $all['coupon_id'] = $coupon_result['id'];
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

        $all['amount'] = $amount;
        $all['type'] = 'insurance';
        $all['state'] = 'pending';
        $all['user_id'] = Auth::user()->id;
        $all['image'] = $image;
        $all['image1'] = $image1;

        $item['title'] = $lang == 'ar' ? $service->ar_name : $service->en_name;
        $item['price'] = number_format($service->price*count($times), 2, '.', '');
        $item['quantity'] = $quantity;
        $item['price_sub'] =  number_format($sub_amount, 2, '.', '');

        $items = [];
        array_push($items, $item);

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
        ->where('bookings.id', $booking->id)
        ->select('bookings.*', "services.en_name", "services.ar_name", "services.price", "users.full_name", "users.phone", "users.email")
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

        $sub_amount = $price * $quantity * count($times);
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
        $fields['client_customer_id'] = $user->id;
        $fields['customer_id'] = $user->customer_id;

        $products = [];
        $product['name'] = "Total : ";
        $product['unit_amount'] = $amount *1000;
        $product['quantity'] = 1;
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
        $stringTimes = '\"'.$stringTimes.'\"'; 
        $metadata['times'] = $stringTimes;
        $fields['metadata'] = $metadata;
        $secret_key = config('app.THAWANI_SECRET_KEY');
        $feedback = $this->sendThawaniRequest('https://uatcheckout.thawani.om/api/v1/checkout/session', "POST", json_encode($fields));
        $session_id = "";

        return response()->json([
            'success'=>false,
            'data'=>$feedback
        ]);

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

    public function cancelBooking(Request $request){
        $id = $request->id;
        $booking = Booking::find($id);
        if($booking->state != "pending" || $booking->state != "rejected"){
            if($booking->type == "card"){

            }else if($booking->type == "coupon"){

            }
            $booking->delete();
            return response()->json([
                'success'=>true,
            ]);
        }else{
            return response()->json([
                'success'=>false,
            ]);
        }
    }

    public function getMyBookings(Request $request){
        $user = Auth::user();

        $bookings = DB::table('bookings')
        ->leftJoin('services', 'services.id', "bookings.service_id")
        ->leftJoin('users', 'users.id', "bookings.user_id")
        ->leftJoin('workers', 'workers.id', "bookings.worker_id")
        ->where('users.id', $user->id)
        ->select('bookings.*', "services.en_name", "services.ar_name", "services.price", "workers.full_name", "workers.image")
        ->orderBy('bookings.id', 'desc')
        ->get();

        return response()->json([
            'success'=>true,
            'data'=>$bookings,
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

    public function orderingWithCard(Request $request){
        $type = $request->type;
        // $lang = $request->lang;
        $lang = 'en';
        $code = $request->coupon;
        $carts = $request->carts;

        $all = $request->all();

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
        if($code != ""){
            $types = ['cart', $type];
            $today = date("Y-m-d");
            $coupon = Coupon::where('code', $code)
                        ->whereIn('type', $types)
                        ->whereDate('expire', '>=', $today)
                        ->first();
            if($coupon){
                $coupon_amount = ($sub_amount * $coupon->percent)%100;
                $coupon->available = false;
                $coupon->save();
                $all['coupon_id'] = $coupon->id;
            }else{
                return response()->json([
                    'success'=>false,
                ]);
            }
        }

        $total_amount = $sub_amount + $tax_amount - $coupon_amount;

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
        $all['invoice'] = $pdf_name;

        $all['amount'] = $total_amount;
        $all['type'] = 'card';
        $all['carts'] =  $carts;
        $all['state'] = 'accepted';
        $all['user_id'] = Auth::user()->id;

        $ordering = Ordering::create($all);
        $ordering = DB::table('orderings')
            ->leftJoin('users', 'users.id', "orderings.user_id")
            ->where('orderings.id', $ordering->id)
            ->select('orderings.*', "users.full_name", "users.phone", "users.email")
            ->first();

        $this->sendOrderingMailWithPDF($ordering);
        return response()->json([
            'success'=>true,
        ]);
    }

    public function getCouponPrice($sub_amount, $coupon, $type){
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
            $coupon->available = false;
            $coupon->save();
            $result['id'] = $coupon->id;
            $result['coupon_amount'] = $coupon_amount;
        }
        return $result;
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
