<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'full_name' => "CareMe",
            'first_name' => "CareMe",
            'last_name' => "CareMe",
            'email' => "mszero1072@gmail.com",
            'email_verified_at' => now(),
            'phone' => '+96897135701',
            'password' => bcrypt('root'),
            'role' => 'admin',
            'active' => true,
        ]);

        DB::table('users')->insert([
            'full_name' => "Bognar Vojislav",
            'first_name' => "Bognar",
            'last_name' => "Vojislav",
            'email' => "bognarvojislav791@gmail.com",
            'email_verified_at' => now(),
            'phone' => '+96892123456',
            'password' => bcrypt('123456'),
            'role' => 'provider',
            'active' => true,
        ]);

        DB::table('cities')->insert([
           ['en_name' => 'Adam', 'ar_name' => 'ادم'],
           ['en_name' => 'As Sib', 'ar_name' => 'السيب'],
           ['en_name' => 'Al Ashkharah', 'ar_name' => 'الاشخره'],
           ['en_name' => 'Al Buraimi', 'ar_name' => 'البريمي'],
           ['en_name' => 'Al Hamra', 'ar_name' => 'الحمراء'],
           ['en_name' => 'Al Jazer', 'ar_name' => 'الجازر'],
           ['en_name' => 'Al Suwaiq', 'ar_name' => 'السويق'],
           ['en_name' => 'Bahla', 'ar_name' => 'بهلاء'],
           ['en_name' => 'Barka', 'ar_name' => 'بركاء'],
           ['en_name' => 'Bidbid', 'ar_name' => 'بدبد'],
           ['en_name' => 'Bidiya', 'ar_name' => 'بديه'],
           ['en_name' => 'Duqm', 'ar_name' => 'الدقم'],
           ['en_name' => 'Haima', 'ar_name' => 'هيماء'],
           ['en_name' => 'Ibra', 'ar_name' => 'ابرا'],
           ['en_name' => 'Ibri', 'ar_name' => 'عبري'],
           ['en_name' => 'Izki', 'ar_name' => 'ازكي'],
           ['en_name' => 'Jabrin', 'ar_name' => 'جبرين'],
           ['en_name' => 'Jalan Bani Bu Hassan', 'ar_name' => 'جعلان بني بو حسن'],
           ['en_name' => 'Khasab', 'ar_name' => 'خصب'],
           ['en_name' => 'Mahooth', 'ar_name' => 'محوت'],
           ['en_name' => 'Manah', 'ar_name' => 'منح'],
           ['en_name' => 'Masirah', 'ar_name' => 'مصيره'],
           ['en_name' => 'Matrah', 'ar_name' => 'مطرح'],
           ['en_name' => 'Mudhaybi', 'ar_name' => 'المضيبي'],
           ['en_name' => 'Mudhaireb', 'ar_name' => 'مضيرب'],
           ['en_name' => 'Muscat', 'ar_name' => 'مسقط'],
           ['en_name' => 'Nizwa', 'ar_name' => 'نزوى'],
           ['en_name' => 'Quriyat', 'ar_name' => 'قريات'],
           ['en_name' => 'Raysut', 'ar_name' => 'ريسوت'],
           ['en_name' => 'Rustaq', 'ar_name' => 'الرستاق'],
           ['en_name' => 'Ruwi', 'ar_name' => 'روي'],
           ['en_name' => 'Saham', 'ar_name' => 'صحم'],
           ['en_name' => 'Shinas', 'ar_name' => 'شناص'],
           ['en_name' => 'Salalah', 'ar_name' => 'صلالة'],
           ['en_name' => 'Samail', 'ar_name' => 'سمائل'],
           ['en_name' => 'Sohar', 'ar_name' => 'صحار'],
           ['en_name' => 'Sur', 'ar_name' => 'صور'],
           ['en_name' => 'Thumrait', 'ar_name' => 'ثمريت']
        ]);
    }
}
