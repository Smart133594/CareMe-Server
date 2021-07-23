<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Verification;
use App\Models\Category;
use App\Models\Vendor;
use App\Models\VendorGallery;
use App\Models\City;
use App\Models\Department;
use App\Models\Service;
use App\Models\Product;
use App\Models\Worker;
use App\Models\Offday;
use App\Models\Holiday;
use App\Models\Banner;
use App\Models\Booking;
use App\Models\WishList;
use App\Models\Coupon;
use App\Mail\BookingMail;
use App\Models\AboutUs;
use App\Models\Policy;
use App\Models\DeliveryTerm;
use App\Models\TermsAndCondition;
use App\Models\ExchangeAndReturn;
use App\Models\CustomerService;
use App\Models\HowRegisterOrder;
use App\Models\SystemSetting;
use App\Models\SocialLink;
use App\Models\Ordering;

use App\Traits\CommonHelper;
use File;
use DB;


class AdminController extends Controller{
    use CommonHelper;
    //getProviders

    public function saveSystemSettings(Request $request){
        $all = $request->all();
        foreach ($all as $setting) {
            SystemSetting::where('key', $setting['key'])->delete();
            SystemSetting::create($setting);
        }
        return response()->json([
            'success'=>true,
        ]);
    }

    public function saveSocialLinks(Request $request){
        $all = $request->all();
        DB::table('social_links')->delete();
        SocialLink::create($all);
        return response()->json([
            'success'=>true,
        ]);
    }

    public function getProviders(Request $request){
        $users = User::where('role', 'provider')->orderBy('id')->get();
        $result = ['users'=>$users];
        return response()->json([
            'success'=>true,
            'data'=>$result
        ]);
    }

    public function addProvider(Request $request){
        $email = $request->email;
        $phone = $request->phone;
        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $avatar = $request->avatar;
        $password = $request->password;
        $active = $request->active;
        $id = $request->id;

        if($id == -1){
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
        }

        if ($avatar && str_contains($avatar, 'data:image')) {
            if($id != -1){
                $oldfile = User::find($id)->avatar;
                File::delete(public_path() . "/uploads/avatars/".$oldfile);
            }

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
        }else{
            $avatar = null;
        }

        $all['id'] = $id;
        $all['full_name'] = $first_name . $last_name;
        $all['first_name'] = $first_name;
        $all['last_name'] = $last_name;
        if($avatar)
            $all['avatar'] = $avatar;
        $all['email'] = $email;
        $all['phone'] = $phone;
        $all['phone_verified_at'] = now();
        $all['role'] = 'provider';
        $all['active'] = $active;
        $all['roles'] = [];
        if($id == -1)
            $all['password'] = bcrypt($password);
        User::updateOrCreate(['id'=>$all['id']], $all);

        return response()->json([
            'success'=>true,
        ]);
    }

    public function deleteProvider(Request $request){
        $id = $request->id;
        $user = User::find($id);
        $avatar = $user->avatar;
        if ($avatar) {
            File::delete(public_path() . "/uploads/avatars/".$avatar);
        }
        $user->delete();
        return response()->json([
            'success'=>true,
        ]);
    }

    public function saveVendorRole(Request $request){
        $roles = $request->roles;

        foreach ($roles as $role) {
            User::where('id', $role['id'])
            ->update(['roles'=>$role['roles']]);
        }
        return response()->json([
            'success'=>true,
        ]);
    }

    ///Categories
    public function addCategory(Request $request){
        $id = $request->id;
        $en_name = $request->en_name;
        $ar_name = $request->ar_name;
        $active = $request->active;
        $image = $request->image;

        if ($image && str_contains($image, 'data:image')) {
            if($id != -1){
                $oldfile = Category::find($id)->image;
                File::delete(public_path() . "/uploads/categories/".$oldfile);
            }

            $data64 = explode(',', $image)[1];
            $file_name = 'category'.time(). '.png';
            $path = public_path() . "/uploads/categories/";
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

        $all['id'] = $id;
        $all['en_name'] = $en_name;
        $all['ar_name'] = $ar_name;
        if($image)
            $all['image'] = $image;
        $all['active'] = $active;
        $category = Category::updateOrCreate(['id' => $all['id']], $all);
        return response()->json([
            'success'=>true,
        ]);
    }

    public function getCategories(Request $request){
        $categories = Category::orderBy('id')->get();
        return response()->json([
            'success'=>true,
            'data'=>$categories
        ]);
    }

    public function deleteCategory(Request $request){
        $id = $request->id;
        $category = Category::find($id);
        ///Delete Vendors, Departments, Servicies & Products, Bookings & Ordering.
        // Vendor Delete
        $vendors = $category->vendors;
        foreach ($vendors as $vendor) {
            $images = $vendor->images;
            foreach ($images as $value) {
                $image = $value['image'];
                File::delete(public_path() . "/uploads/vendors/".$image);
                $value->delete();
            }

            $departments = $vendor->departments;
            foreach ($departments as $department) {
                $servicies = $department->servicies;
                $products = $department->products;

                foreach ($servicies as $service) {
                    $image = $service->image;
                    File::delete(public_path() . "/uploads/servicies/".$image);
                    $service->delete();
                }

                foreach ($products as $product) {
                    $image = $product->image;
                    File::delete(public_path() . "/uploads/products/".$image);
                    $product->delete();
                }

                $department->delete();
            }
            $vendor->delete();
            // $departments = $vendor->departments;
        }

        $image = $category->image;
        if($image){
            File::delete(public_path() . "/uploads/categories/".$image);
        }
        $category->delete();
        return response()->json([
            'success'=>true,
        ]);
    }

    ///Vendors
    public function getVendors(Request $request){
        $categories = Category::where('active', true)->orderBy('id')->get();
        $vendors = Vendor::orderBy('id')->get();
        foreach ($vendors as $vendor) {
            $vendor->category;
            $vendor->images;
            $vendor->city;
        }

        $result = ['categories'=>$categories, 'vendors'=>$vendors];
        return response()->json([
            'success'=>true,
            'data'=>$result
        ]);
    }

    public function addVendor(Request $request){
        $all['id'] = $request->id;
        $all['category_id'] = $request->category_id;
        $all['city_id'] = $request->city_id;
        $all['en_name'] = $request->en_name;
        $all['ar_name'] = $request->ar_name;
        $all['en_address'] = $request->en_address;
        $all['ar_address'] = $request->ar_address;
        $all['lat'] = $request->lat;
        $all['lng'] = $request->lng;
        $all['rating'] = $request->rating;
        $all['phone'] = $request->phone;
        $all['recommended'] = $request->recommended;
        $all['active'] = $request->active;
        $vendor = Vendor::updateOrCreate(['id' => $all['id']], $all);
        $images = $request->images;
        $index = 0;
        foreach ($images as $value) {
            $image = $value['image'];
            $id = $value['id'];
            $index ++;
            if ($image && str_contains($image, 'data:image')) {
                if($id != -1){
                    $oldfile = VendorGallery::find($id)->image;
                    File::delete(public_path() . "/uploads/vendors/".$oldfile);
                }

                $data64 = explode(',', $image)[1];
                $file_name = 'vendor'.$index.time(). '.png';
                $path = public_path() . "/uploads/vendors/";
                $uploadPath = $path. $file_name;

                if(!File::isDirectory($path)){
                    File::makeDirectory($path, 0777, true, true);
                }
                $data64 = base64_decode($data64);
                if (file_put_contents($uploadPath, $data64)) {
                    $image = $file_name;
                    VendorGallery::updateOrCreate(['id' => $id], ['id'=>$id, 'vendor_id'=>$vendor->id, 'image'=>$image]);
                }
            }
        }
        return response()->json([
            'success'=>true,
        ]);
    }

    public function deleteVendor(Request $request){
        $id = $request->id;
        $vendor = Vendor::find($id);
        ///Delete Departments, Servicies & Products, Bookings & Ordering.
        $departments = $vendor->departments;
        foreach ($departments as $department) {
            $servicies = $department->servicies;
            $products = $department->products;

            foreach ($servicies as $service) {
                $image = $service->image;
                File::delete(public_path() . "/uploads/servicies/".$image);
                $service->delete();
            }

            foreach ($products as $product) {
                $image = $product->image;
                File::delete(public_path() . "/uploads/products/".$image);
                $product->delete();
            }
            $department->delete();
        }

        $images = $vendor->images;
        foreach ($images as $value) {
            $image = $value['image'];
            File::delete(public_path() . "/uploads/vendors/".$image);
            $value->delete();
        }

        $vendor->delete();
        return response()->json([
            'success'=>true,
        ]);
    }

    ///Cities
    public function getCities(Request $request){
        $cities = City::orderBy('id')->get();
        return response()->json([
            'success'=>true,
            'data'=>$cities
        ]);
    }

    ///Departmemts
    public function getDepartments(Request $request){
        $user = Auth::user();

        if($user->role == 'admin'){
            $vendors = Vendor::orderBy('id')->get();
        }else if($user->role == 'provider'){
            $vendor_ids = $user->roles;
            $vendors = Vendor::whereIn('id', $vendor_ids)->orderBy('id')->get();
        }

        $departments = [];
        foreach ($vendors as $vendor) {
            $atDepartments = $vendor->departments;
            foreach ($atDepartments as $department) {
                $department->vendor;
                array_push($departments, $department);
            }
        }

        $result = ['vendors'=>$vendors, 'departments'=>$departments];
        return response()->json([
            'success'=>true,
            'data'=>$result
        ]);
    }

    public function addDepartment(Request $request){
    //    $id = $request->id;
    //    $vendor_id = $request->vendor_id;
    //    $en_name = $request->en_name;
    //    $ar_name = $request->ar_name;
    //    $active = $request->active;
       $all = $request->all();
       Department::updateOrCreate(['id' => $all['id']], $all);
       return response()->json([
           'success'=>true,
       ]);
    }

    public function deleteDepartment(Request $request){
        $id = $request->id;
        $department = Department::find($id);
        //Delete services & products on here

        $servicies = $department->servicies;
        $products = $department->products;

        foreach ($servicies as $service) {
            $image = $service->image;
            File::delete(public_path() . "/uploads/servicies/".$image);
            $service->delete();
        }

        foreach ($products as $product) {
            $image = $product->image;
            File::delete(public_path() . "/uploads/products/".$image);
            $product->delete();
        }

        $department->delete();
        return response()->json([
            'success'=>true,
        ]);
    }

    // Service Part
    public function getServicies(Request $request){
        $user = Auth::user();
        $servicies = [];
        $departments = [];

        if($user->role == 'admin'){
            $departments = Department::orderBy('id')->get();
            $servicies = Service::orderBy('id')->get();
            foreach ($servicies as $service) {
                $service->department->vendor;
            }

        }else if($user->role == 'provider'){
            $vendor_ids = $user->roles;
            $vendors = Vendor::whereIn('id', $vendor_ids)->orderBy('id')->get();

            foreach ($vendors as $vendor) {
                $ats = $vendor->departments;
                foreach ($ats as $at) {
                    $other = clone($at);
                    array_push($departments, $other);
                    $serviceAt = $at->servicies;
                    foreach ($serviceAt as $service) {
                        $vendor = $service->department->vendor;
                        array_push($servicies, $service);
                    }
                }
            }
        }

        $result = ['servicies'=>$servicies, 'departments' => $departments];
        return response()->json([
            'success'=>true,
            'data'=>$result
        ]);
    }

    public function addService(Request $request){
        $id = $request->id;
        $image = $request->image;
        $all = $request->all();

        if ($image && str_contains($image, 'data:image')) {
            if($id != -1){
                $oldfile = Service::find($id)->image;
                File::delete(public_path() . "/uploads/servicies/".$oldfile);
            }

            $data64 = explode(',', $image)[1];
            $file_name = 'service'.time(). '.png';
            $path = public_path() . "/uploads/servicies/";
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
            if($id != -1)
                $image = Service::find($id)->image;
            else
                $image = null;
        }

        $all['image'] = $image;
        Service::updateOrCreate(['id' => $all['id']], $all);
        return response()->json([
            'success'=>true,
        ]);
    }

    public function deleteService(Request $request){
        $id = $request->id;
        $service = Service::find($id);

        $image = $service->image;
        if($image != null){
            File::delete(public_path() . "/uploads/servicies/".$image);
        }

        WishList::where('service_id', $service->id)->delete();

        $service->delete();
        return response()->json([
            'success'=>true,
        ]);
    }

    //Product part
    public function getProducts(Request $request){
        $user = Auth::user();
        $products = [];
        $departments = [];

        if($user->role == 'admin'){
            $departments = Department::orderBy('id')->get();
            $products = Product::orderBy('id')->get();
            foreach ($products as $product) {
                $vendor = $product->department->vendor;
            }

        }else if($user->role == 'provider'){
            $vendor_ids = $user->roles;
            $vendors = Vendor::whereIn('id', $vendor_ids)->orderBy('id')->get();
            foreach ($vendors as $vendor) {
                $ats = $vendor->departments;
                foreach ($ats as $at) {
                    $other = clone($at);
                    array_push($departments, $other);
                    $productAt = $at->products;
                    foreach ($productAt as $product) {
                        $vendor = $product->department->vendor;
                        array_push($products, $product);
                    }
                }
            }
        }

        $result = ['products'=>$products, 'departments' => $departments];
        return response()->json([
            'success'=>true,
            'data'=>$result
        ]);
    }

    public function addProduct(Request $request){
        $id = $request->id;
        $image = $request->image;
        $all = $request->all();

        if ($image && str_contains($image, 'data:image')) {
            if($id != -1){
                $oldfile = Product::find($id)->image;
                File::delete(public_path() . "/uploads/products/".$oldfile);
            }

            $data64 = explode(',', $image)[1];
            $file_name = 'product'.time(). '.png';
            $path = public_path() . "/uploads/products/";
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
            if($id != -1)
                $image = Product::find($id)->image;
            else
                $image = null;
        }

        $all['image'] = $image;
        Product::updateOrCreate(['id' => $all['id']], $all);
        return response()->json([
            'success'=>true,
        ]);
    }

    public function deleteProduct(Request $request){
        $id = $request->id;
        $product = Product::find($id);

        $image = $product->image;
        if($image != null){
            File::delete(public_path() . "/uploads/products/".$image);
        }
        WishList::where('product_id', $product->id)->delete();
        $product->delete();
        return response()->json([
            'success'=>true,
        ]);
    }
    // workers

    public function getWorkers(Request $request){
        $user = Auth::user();

        $workers = DB::table('workers')
        ->leftJoin('users', 'users.id', '=', 'workers.user_id')
        ->where('users.id', $user->id)
        ->select('workers.*')
        ->get();

        $vendor_ids = $user->roles;
        $vendors = Vendor::whereIn('id', $vendor_ids)->orderBy('id')->get();
        $servicies = [];
        foreach ($vendors as $vendor) {
            $ats = $vendor->departments;
            foreach ($ats as $at) {
                $serviceAt = $at->servicies;
                foreach ($serviceAt as $service) {
                    array_push($servicies, $service);
                }
            }
        }

        $result = ['workers'=>$workers, 'servicies' => $servicies];
        return response()->json([
            'success'=>true,
            'data'=>$result
        ]);
    }

    public function addWorker(Request $request){
        $id = $request->id;
        $image = $request->image;
        $all = $request->all();
        $user = Auth::user();
        if($id == -1){
            $all['user_id'] = $user->id;
        }

        $all['full_name'] = $request->first_name." ".$request->last_name;

        if ($image && str_contains($image, 'data:image')) {
            if($id != -1){
                $oldfile = Worker::find($id)->image;
                File::delete(public_path() . "/uploads/workers/".$oldfile);
            }

            $data64 = explode(',', $image)[1];
            $file_name = 'worker'.time(). '.png';
            $path = public_path() . "/uploads/workers/";
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
            if($id != -1)
                $image = Worker::find($id)->image;
            else
                $image = null;
        }

        $all['image'] = $image;
        Worker::updateOrCreate(['id' => $all['id']], $all);
        return response()->json([
            'success'=>true,
        ]);
    }

    public function deleteWorker(Request $request){
        $id = $request->id;
        $worker = Worker::find($id);

        $image = $worker->image;
        if($image != null){
            File::delete(public_path() . "/uploads/worker/".$image);
        }

        $worker->delete();
        return response()->json([
            'success'=>true,
        ]);
    }

    // Off Days Part

    public function getOffDays(Request $request){
        $user = Auth::user();
        $roles = $user->roles;
        $vendors = [];
        foreach ($roles as $role) {
            $vendor = Vendor::where('id', $role)->select('id', 'en_name', 'ar_name')->first();
            $vendor->offday;
            array_push($vendors, $vendor);
        }
        return response()->json([
            'success'=>true,
            'data'=>$vendors,
        ]);
    }

    public function setOffDays(Request $request){
        $all = $request->all();
        Offday::updateOrCreate(['vendor_id' => $all['vendor_id']], $all);
        return response()->json([
            'success'=>true,
        ]);
    }

    // Holidays
    public function getHolidays(Request $request){
        $user = Auth::user();
        $roles = $user->roles;
        $vendors = [];
        $vendors = Vendor::whereIn('id', $roles)->get();
        $holidays = Holiday::whereIn('vendor_id', $roles)->get();
        $result = ['vendors' => $vendors, 'holidays' => $holidays];

        return response()->json([
            'success'=>true,
            'data'=>$result,
        ]);
    }

    public function addHoliday(Request $request){
        $all = $request->all();
        $holiday = Holiday::updateOrCreate(['id'=>$all['id']], $all);
        return response()->json([
            'success'=>true,
            'data' => $holiday
        ]);
    }

    public function deleteHoliday(Request $request){
        Holiday::find($request->id)->delete();
        return response()->json([
            'success'=>true,
        ]);
    }

    // Banners
    public function getBanners(Request $request){
        $banners = Banner::orderBy('id')->get();
        return response()->json([
            'success'=>true,
            'data'=>$banners
        ]);
    }

    public function addBanner(Request $request){
        $id = $request->id;
        $image = $request->image;
        $all = $request->all();
        $all['creator'] = Auth::user()->full_name;

        if ($image && str_contains($image, 'data:image')) {
            if($id != -1){
                $oldfile = Banner::find($id)->image;
                File::delete(public_path() . "/uploads/banners/".$oldfile);
            }

            $data64 = explode(',', $image)[1];
            $file_name = 'service'.time(). '.png';
            $path = public_path() . "/uploads/banners/";
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
            if($id != -1)
                $image = Service::find($id)->image;
            else
                $image = null;
        }

        $all['image'] = $image;
        Banner::updateOrCreate(['id' => $all['id']], $all);
        return response()->json([
            'success'=>true,
        ]);
    }

    public function deleteBanner(Request $request){
        $id = $request->id;
        $banner = Banner::find($id);
        $image = $banner->image;
        if($image != null){
            File::delete(public_path() . "/uploads/banners/".$image);
        }
        $banner->delete();

        return response()->json([
            'success'=>true,
        ]);
    }


    ///AbouUS

    public function saveAboutUS(Request $request){
        $all = $request->all();
        $about = AboutUs::updateOrCreate(['id' => $all['id']], $all);
        return response()->json([
            'success'=>true,
            'data'=>$about,
        ]);
    }

    public function savePolicy(Request $request){
        $all = $request->all();
        $item = Policy::updateOrCreate(['id' => $all['id']], $all);
        return response()->json([
            'success'=>true,
            'data'=>$item,
        ]);
    }

    public function saveDeliveryTerms(Request $request){
        $all = $request->all();
        $item = DeliveryTerm::updateOrCreate(['id' => $all['id']], $all);
        return response()->json([
            'success'=>true,
            'data'=>$item,
        ]);
    }

    public function saveTermsAndConditions(Request $request){
        $all = $request->all();
        $item = TermsAndCondition::updateOrCreate(['id' => $all['id']], $all);
        return response()->json([
            'success'=>true,
            'data'=>$item,
        ]);
    }

    public function saveExchangeAndReturns(Request $request){
        $all = $request->all();
        $item = ExchangeAndReturn::updateOrCreate(['id' => $all['id']], $all);
        return response()->json([
            'success'=>true,
            'data'=>$item,
        ]);
    }

    public function saveCustomerServices(Request $request){
        $all = $request->all();
        $item = CustomerService::updateOrCreate(['id' => $all['id']], $all);
        return response()->json([
            'success'=>true,
            'data'=>$item,
        ]);
    }
    
    public function saveHowRegisterOrders(Request $request){
        $all = $request->all();
        $item = HowRegisterOrder::updateOrCreate(['id' => $all['id']], $all);
        return response()->json([
            'success'=>true,
            'data'=>$item,
        ]);
    }

    // Coupons
    public function getCoupons(Request $request){
        $coupons = Coupon::orderBy('id', 'desc')->get();
        return response()->json([
            'success'=>true,
            'data'=>$coupons
        ]);
    }

    public function addCoupon(Request $request){
        $all = $request->all();
        if($all['id'] == -1){
            $coupon = Coupon::where('code', $all['code'])->get()->count();
            if($coupon>0){
                return response()->json([
                    'success'=>false,
                ]);
            }
        }
        Coupon::updateOrCreate(['id'=>$all['id']], $all);
        return response()->json([
            'success'=>true,
        ]);
    }

    public function deleteCoupon(Request $request){
        $id = $request->id;
        $coupon = Coupon::find($id);
        if($coupon->available){
            $coupon->delete();
            return response()->json([
                'success'=>true,
            ]);
        }
        return response()->json([
            'success'=>false,
        ]);
    }

    // Clients
    public function getClients(Request $request){
        $users = User::where('role', 'client')->orderBy('id')->get();
        return response()->json([
            'success'=>true,
            'data'=>$users
        ]);
    }

    public function deleteClient(Request $request){
        $user = User::find($request->id);
        $avatar = $user->avatar;
        if ($avatar) {
            File::delete(public_path() . "/uploads/avatars/".$avatar);
        }
        $user->delete();
        return response()->json([
            'success'=>true,
        ]);
    }

    public function manageClient(Request $request){
        $user = User::find($request->id);
        $user->active = !$user->active;
        $user->save();
        return response()->json([
            'success'=>true,
        ]);
    }

    public function getBookings(Request $request){
        $user = Auth::user();
        $bookings = [];
        if($user->role == "admin"){
            $bookings = DB::table('bookings')
            ->leftJoin('services', 'services.id', "bookings.service_id")
            ->leftJoin('departments', 'departments.id', "services.department_id")
            ->leftJoin('vendors', 'vendors.id', "departments.vendor_id")
            ->leftJoin('workers', 'workers.id', "bookings.worker_id")
            ->leftJoin('transactions', 'transactions.id', "bookings.transaction_id")
            ->leftJoin('users', 'users.id', "bookings.user_id")
            ->select('bookings.*', "services.en_name", "services.ar_name", "services.price", "users.full_name", "users.avatar", "users.phone",
                    "users.email", "workers.full_name as worker_name", "workers.image as worker_image", "transactions.payment_id", "transactions.amount",
                    "transactions.payment_status", "transactions.etc", "vendors.en_name as vendor_en_name", "vendors.ar_name as vendor_ar_name")
            ->orderBy('bookings.id', 'desc')
            ->get();
        }else{
            $roles = $user->roles;
            $bookings = DB::table('bookings')
            ->leftJoin('services', 'services.id', "bookings.service_id")
            ->leftJoin('departments', 'departments.id', "services.department_id")
            ->leftJoin('vendors', 'vendors.id', "departments.vendor_id")
            ->leftJoin('users', 'users.id', "bookings.user_id")
            ->leftJoin('workers', 'workers.id', "bookings.worker_id")
            ->leftJoin('transactions', 'transactions.id', "bookings.transaction_id")
            ->whereIn('departments.vendor_id', $roles)
            ->select('bookings.*', "services.en_name", "services.ar_name", "services.price", "users.full_name", "users.avatar", "users.phone",
                    "users.email", "workers.full_name as worker_name", "workers.image as worker_iamge", "transactions.payment_id", "transactions.amount",
                    "transactions.payment_status", "transactions.etc", "vendors.en_name as vendor_en_name", "vendors.ar_name as vendor_ar_name")
            ->orderBy('bookings.id', 'desc')
            ->get();
        }

        return response()->json([
            'success'=>true,
            'data'=>$bookings
        ]);
    }

    public function getOrders(Request $request){
        $user = Auth::user();
        if($user->role == "admin"){
            $orderings = DB::table('orderings')
            ->leftJoin('users', 'users.id', "orderings.user_id")
            ->leftJoin('vendors', 'vendors.id', "orderings.vendor_id")
            ->leftJoin('transactions', 'transactions.id', "orderings.transaction_id")
            ->select('orderings.*', "transactions.payment_id", "transactions.amount", 
            "transactions.payment_status", "users.full_name", "users.email", "users.phone",
            "vendors.en_name as vendor_en_name", "vendors.ar_name as vendor_ar_name")
            ->orderBy('orderings.id', 'desc')
            ->get();
        }else{
            $roles = $user->roles;
            $orderings = DB::table('orderings')
            ->leftJoin('transactions', 'transactions.id', "orderings.transaction_id")
            ->leftJoin('vendors', 'vendors.id', "orderings.vendor_id")
            ->leftJoin('users', 'users.id', "orderings.user_id")
            ->whereIn('orderings.vendor_id', $roles)
            ->select('orderings.*', "transactions.payment_id", "transactions.amount", 
            "transactions.payment_status", "users.full_name", "users.email", "users.phone",
            "vendors.en_name as vendor_en_name", "vendors.ar_name as vendor_ar_name")
            ->orderBy('orderings.id', 'desc')
            ->get();
        }

        foreach ($orderings as $ordering) {
            $carts = json_decode($ordering->carts, true);
            $products = [];
            foreach ($carts as $cart) {
                $product = Product::find($cart['id']);
                if($product){
                    $product->quantity = $cart['quantity'];
                    array_push($products, $product);
                }
            }
            $ordering->carts = $products;
        }

        return response()->json([
            'success'=>true,
            'data'=>$orderings,
        ]);
    }

    public function deliveredOrder(Request $request){
        $id = $request->id;
        $order = Ordering::find($id);
        $all['state'] = 'pending';
        $order->state = 'delivered';
        $order->save();
        return response()->json([
            'success'=>true,
        ]);
    }

    public function rejectOrder(Request $request){
        
    }

    public function refundPayment($payment_id){
        $baseUrl = config('app.THAWANI_BASE_URL');
        $user = Auth::user();
        $fields['payment_id'] = $payment_id;
        $fields['reason'] = "Rejected by provider";
        $metadata['user_id'] = $user->id;
        $fields['metadata'] = $metadata;

        $stringFields = json_encode($fields);
        $stringFields = str_replace("\'", "'", $stringFields);

        $feedback = $this->sendThawaniRequest($baseUrl.'/refunds', "POST", $stringFields);
        return $feedback;
    }

    public function rejectBooking(Request $request){
        $booking = Booking::find($request->id);
        if($booking){
            if($booking->state!="confirmed"){
                $booking->state = "rejected";
                $booking->reason = "Provider rejected";
                $booking->save();
                $transaction = $booking->transaction;
                if($transaction->payment_status == 'paid'){
                    $feedback = $this->refundPayment($transaction->payment_id);
                    $transaction->payment_status = 'refund';
                    $transaction->save();
                }
               
                $booking = DB::table('bookings')
                ->leftJoin('services', 'services.id', "bookings.service_id")
                ->leftJoin('users', 'users.id', "bookings.user_id")
                ->leftJoin('transactions', 'transactions.id', "bookings.transaction_id")
                ->where('bookings.id', $booking->id)
                ->select('bookings.*', "services.en_name", "services.ar_name", "services.price", "users.full_name", "users.phone",
                         "users.email", "transactions.amount", "transactions.payment_status")
                ->first();
                $this->sendBookingMail($booking);
                return response()->json([
                    'success'=>true,
                ]);
            }
        }
        return response()->json([
            'success'=>false,
        ]);
    }

    public function payBooking(Request $request){
        $booking = Booking::find($request->id);
        $transaction = $booking->transaction;
        if($transaction){
            if($transaction->payment_status != "paid"){
                $transaction->payment_status = "paid";
                $transaction->etc = now();
                $transaction->save();
                return response()->json([
                    'success'=>true,
                ]);
            }
        }
        return response()->json([
            'success'=>false,
        ]);
    }

    public function confirmBooking(Request $request){
        $booking = Booking::find($request->id);
        if($booking){
            if($booking->state=="pending"){
                $booking->state = "confirmed";
                $booking->save();
                $booking = DB::table('bookings')
                ->leftJoin('services', 'services.id', "bookings.service_id")
                ->leftJoin('users', 'users.id', "bookings.user_id")
                ->leftJoin('transactions', 'transactions.id', "bookings.transaction_id")
                ->where('bookings.id', $booking->id)
                ->select('bookings.*', "services.en_name", "services.ar_name", "services.price", "users.full_name", "users.phone",
                         "users.email", "transactions.amount", "transactions.payment_status")
                ->first();
                $this->sendBookingMail($booking);
                return response()->json([
                    'success'=>true,
                ]);
            }
        }
        return response()->json([
            'success'=>false,
        ]);
    }

    public function editBooking(Request $request){
    }

    public function sendBookingMail($booking){
        Mail::to($booking->email)->send(new BookingMail($booking));
    }
}
