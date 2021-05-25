<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\Service;
use App\Models\Booking;

class BookingMail extends Mailable
{
    use Queueable, SerializesModels;
    public $booking;
    public $file;
    public function __construct($booking, $file = NULL){
        $this->booking=$booking;
        $this->file=$file;
    }

    public function build()
    {
        $subject='Booking Notification from CareMe System';
        $file=$this->file;

        if($file){
            return $this->from("caremeom@gamil.com")
            ->subject($subject)
            ->replyTo("caremeom@gamil.com")
            ->attach($file, [
                'as' => 'invoice.pdf',
                'mime' => 'application/pdf',
           ])
           ->view('mails.BookingMail');

        }else{
            return $this->from("caremeom@gamil.com")
            ->subject($subject)
            ->replyTo("caremeom@gamil.com")
            ->view('mails.BookingMail');
        }
    }
}
