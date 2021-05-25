<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\Service;
use App\Models\Ordering;

class OrderingMail extends Mailable
{
    use Queueable, SerializesModels;
    public $ordering;
    public $file;
    public function __construct($ordering, $file = NULL){
        $this->ordering=$ordering;
        $this->file=$file;
    }

    public function build()
    {
        $subject='Ordering Notification from CareMe System';
        $file=$this->file;

        if($file){
            return $this->from("caremeom@gamil.com")
            ->subject($subject)
            ->replyTo("caremeom@gamil.com")
            ->attach($file, [
                'as' => 'invoice.pdf',
                'mime' => 'application/pdf',
           ])
           ->view('mails.OrderingMail');

        }else{
            return $this->from("caremeom@gamil.com")
            ->subject($subject)
            ->replyTo("caremeom@gamil.com")
            ->view('mails.OrderingMail');
        }
    }
}
