<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::Group(['namespace'=>'Api', 'middleware' => ['cors']],function (){
    Route::post('phoneVerification', 'UserController@phoneVerification');
    Route::post('checkVerify', 'UserController@checkVerify');
    Route::post('signup', 'UserController@signup');
    Route::post('signin', 'UserController@signin');
    Route::post('resetPassword', 'UserController@resetPassword');
    Route::post('sendAppUrl', 'UserController@sendAppUrl');
});

Route::Group(['namespace'=>'Api', 'middleware' => ['cors']],function (){
    Route::get('getSearchItems', 'ClientController@getSearchItems');
    Route::get('getFrontData', 'ClientController@getFrontData');
    Route::post('getVendors', 'ClientController@getVendors');
    Route::get('getFilterData', 'ClientController@getFilterData');
    Route::get('getVendor/{vendor_id}', 'ClientController@getVendor');
    Route::post('getServicies', 'ClientController@getServicies');
    Route::post('getProducts', 'ClientController@getProducts');
    Route::get('getService/{service_id}', 'ClientController@getService');
    Route::get('getProduct/{product_id}', 'ClientController@getProduct');
    Route::post('getCarts', 'ClientController@getCarts');
    Route::post('getNearVendors', 'ClientController@getNearVendors');
    Route::get('getAboutUs', 'ClientController@getAboutUs');
    Route::get('getPolicy', 'ClientController@getPolicy');
    Route::get('getDeliveryTerms', 'ClientController@getDeliveryTerms');
    Route::get('getTermsAndConditions', 'ClientController@getTermsAndConditions');
    Route::get('getExchangeAndReturns', 'ClientController@getExchangeAndReturns');
    Route::get('getCustomerServices', 'ClientController@getCustomerServices');
    Route::get('getHowRegisterOrders', 'ClientController@getHowRegisterOrders');
    Route::get('getSystemSettings', 'ClientController@getSystemSettings');
    Route::get('getSocialLinks', 'ClientController@getSocialLinks');
});

Route::Group(['namespace'=>'Api', 'middleware' => ['cors', 'auth:api']], function () {
    Route::post('addWish', 'ClientController@addWish');
    Route::post('removeWish', 'ClientController@removeWish');
    Route::get('getWishes', 'ClientController@getWishes');
    Route::post('bookingWithInsurance', 'ClientController@bookingWithInsurance');
    Route::get('getMyBookings', 'ClientController@getMyBookings');
    Route::post('cancelBooking', 'ClientController@cancelBooking');
    Route::post('checkCoupon', 'ClientController@checkCoupon');
    Route::post('getServiceSession', 'ClientController@getServiceSession');
    Route::post('getProductSession', 'ClientController@getProductSession');
    Route::get('getMyOrders', 'ClientController@getMyOrders');
});


Route::Group(['namespace'=>'Api', 'middleware' => ['cors', 'auth:api']], function () {
    Route::post('changedProfile', 'UserController@changedProfile');
});

Route::Group(['namespace'=>'Api', 'middleware' => ['cors', 'auth:api']], function () {
    //Provider Part
    Route::get('getProviders', 'AdminController@getProviders');
    Route::post('addProvider', 'AdminController@addProvider');
    Route::post('deleteProvider', 'AdminController@deleteProvider');
    // Category Part
    Route::get('getCategories', 'AdminController@getCategories');
    Route::post('addCategory', 'AdminController@addCategory');
    Route::post('deleteCategory', 'AdminController@deleteCategory');
    // Vendor Part
    Route::get('getVendors', 'AdminController@getVendors');
    Route::post('addVendor', 'AdminController@addVendor');
    Route::post('deleteVendor', 'AdminController@deleteVendor');
    //City Part
    Route::get('getCities', 'AdminController@getCities');
    ///DepartMent Part
    Route::get('getDepartments', 'AdminController@getDepartments');
    Route::post('addDepartment', 'AdminController@addDepartment');
    Route::post('deleteDepartment', 'AdminController@deleteDepartment');
    //Service Part
    Route::get('getServicies', 'AdminController@getServicies');
    Route::post('addService', 'AdminController@addService');
    Route::post('deleteService', 'AdminController@deleteService');
    //Product Part
    Route::get('getProducts', 'AdminController@getProducts');
    Route::post('addProduct', 'AdminController@addProduct');
    Route::post('deleteProduct', 'AdminController@deleteProduct');
    // Woker Part
    Route::get('getWorkers', 'AdminController@getWorkers');
    Route::post('addWorker', 'AdminController@addWorker');
    Route::post('deleteWorker', 'AdminController@deleteWorker');
    // Off Days Part
    Route::get('getOffDays', 'AdminController@getOffDays');
    Route::post('setOffDays', 'AdminController@setOffDays');
    // Holiday Part
    Route::get('getHolidays', 'AdminController@getHolidays');
    Route::post('addHoliday', 'AdminController@addHoliday');
    Route::post('deleteHoliday', 'AdminController@deleteHoliday');
   
    // Banner
    Route::get('getBanners', 'AdminController@getBanners');
    Route::post('addBanner', 'AdminController@addBanner');
    Route::post('deleteBanner', 'AdminController@deleteBanner');
    // Coupons
    Route::get('getCoupons', 'AdminController@getCoupons');
    Route::post('addCoupon', 'AdminController@addCoupon');
    Route::post('deleteCoupon', 'AdminController@deleteCoupon');

    //Clients
    Route::get('getClients', 'AdminController@getClients');
    Route::post('deleteClient', 'AdminController@deleteClient');
    Route::post('manageClient', 'AdminController@manageClient');

    // Vendor Role
    Route::post('saveVendorRole', 'AdminController@saveVendorRole');
    // Booking
    Route::get('getBookings', 'AdminController@getBookings');
    Route::post('rejectBooking', 'AdminController@rejectBooking');
    Route::post('payBooking', 'AdminController@payBooking');
    Route::post('confirmBooking', 'AdminController@confirmBooking');

    // Orders
    Route::get('getOrders', 'AdminController@getOrders');

    //Footer Part
    Route::post('saveAboutUs', 'AdminController@saveAboutUs');
    Route::post('savePolicy', 'AdminController@savePolicy');
    Route::post('saveDeliveryTerms', 'AdminController@saveDeliveryTerms');
    Route::post('saveTermsAndConditions', 'AdminController@saveTermsAndConditions');
    Route::post('saveExchangeAndReturns', 'AdminController@saveExchangeAndReturns');
    Route::post('saveCustomerServices', 'AdminController@saveCustomerServices');
    Route::post('saveHowRegisterOrders', 'AdminController@saveHowRegisterOrders');
    Route::post('saveSocialLinks', 'AdminController@saveSocialLinks');
    Route::post('saveSystemSettings', 'AdminController@saveSystemSettings');
});

Route::Group(['namespace'=>'Api', 'middleware' => ['cors', 'auth:api'], 'prefix'=>'client'], function () {

});
