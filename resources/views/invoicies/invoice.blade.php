<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>@lang('invoice.invoice')</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <style type="text/css">
        html {
            overflow: auto;
            cursor: default;
            background: #fff;
            font: 16px/1 'Open Sans', sans-serif;
        }

        body {
            margin: 0;
            color: #000;
            background: #FFF;
            box-sizing: border-box;
        }

        header {
            position: relative;
        }

        header:after {
            clear: both;
            content: "";
            display: table;
        }

        header h1 {
            font-size: 40px;
            background: #fff;
            text-transform: uppercase;
        }

        table {
            font-size: 85%;
            border-spacing: 0;
            border-collapse: collapse;
        }

        table.inventory,
        table.balance {
            background-color: #f9f9f9;
            margin-top:5px;
        }

        table.inventory th {
            color: #fff;
            background: #000;
        }

        th, td {
            text-align: left;
        }

        table.balance {
            width: 50%;
            float: right;
        }

        table.balance:after {
            clear: both;
            content: "";
        }

        table.balance th,
        table.balance td {
            background-color: #f9f9f9
        }

        table.balance td {
            text-align: right;
        }

        table.inventory {
            width: 100%;
            clear: both;
        }

        table.inventory th {
            font-size: 15px;
            font-weight: bold;
        }
    </style>
</head>
<body>
<header>
    <div class="company-info" style="width: 50%; float: left;">
        <h1 style="margin-bottom: 0;">@lang('invoice.invoice')</h1>
        <p style="margin-bottom: 0;">@lang('invoice.company')</p>
        <p>@lang('invoice.address')</p>
    </div>
    <div class="company-logo" style="max-width: 200px; float: right;">
        <img src="data:image/png;base64,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" style="width: 100%; max-width: 300px; height: auto;" alt="">
    </div>
</header>

<main>
    <section style="margin-bottom: 25px;">
        <address contenteditable style="width: 50%; float: left; font-style: normal; margin-bottom: 10px;">
            <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">@lang('invoice.invoice_to')</h3>
            <span style="font-size: 16px; margin-bottom: 5px;">{{$full_name}}</span> <br>
            <span style="font-size: 16px; margin-bottom: 5px;">{{$email}}</span> <br>
            <span style="font-size: 16px; margin-bottom: 5px;">{{$phone}}</span> <br>
        </address>
        <div style="width: 50%; float: left;">
            <p style="text-align: right;">
                <span style="font-weight: bold; font-size: 15px;">@lang('invoice.invoice_id'):</span>
                <span style="font-weight: lighter; font-size: 14px;">{{$id}}</span>
            </p>
            <p style="text-align: right;">
                <span style="font-weight: bold; font-size: 15px;">@lang('invoice.vendor_name'):</span>
                <span style="font-weight: lighter; font-size: 14px;">{{$vendor_name}}</span>
            </p>
            <p style="text-align: right;">
                <span style="font-weight: bold; font-size: 15px;">@lang('invoice.date'):</span>
                <span style="font-weight: lighter; font-size: 14px;">{{$date}}</span>
            </p>
        </div>
    </section>

    <section>
        <div class="invoice-table-wrapper" style="margin-top: 10px;">
            <table class="inventory">
                <thead style="border: 0;">
                <tr style="border: 0;">
                    <th style="text-align: left; border-right: 2px solid #fff; padding: 0 10px;" colspan="2">
                        <p>@lang('invoice.service')/@lang('invoice.product')</p></th>
                    <th style="text-align: right; border-right: 2px solid #fff; padding: 0 10px;">
                        <p>@lang('invoice.unit_price')</p></th>
                    <th style="text-align: right; border-right: 2px solid #fff; padding: 0 10px;">
                        <p>@lang('invoice.quantity')</p></th>
                    <th style="text-align: right; padding: 0 10px;"><p>@lang('invoice.price')</p></th>
                </tr>
                </thead>
                <tbody>
                @foreach($items as $item)
                    <tr>
                        <td style="font-size: 15px; padding: 0 10px;" colspan="2">
                            <p>
                                {{$item['title']}}
                            </p>
                        </td>
                        <td style="font-size: 15px; text-align: right; padding: 5px 10px;">
                            <p>
                                {{$item['price']}}
                            </p>
                        </td>
                        <td style="font-size: 15px; text-align: right; padding: 5px 10px;">
                            <p>
                                {{$item['quantity']}}
                            </p>
                        </td>
                        <td style="font-size: 15px; text-align: right; padding: 5px 10px;">
                            <p>
                                {{$item['price_sub']}}
                            </p>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            <table class="balance">
                <tr>
                    <th style="text-align: left; font-size: 15px; padding: 5px 10px;">
                        <span contenteditable>@lang('invoice.subtotal')</span>
                    </th>
                    <td style="text-align: right; font-size: 15px; padding: 5px 10px;">
                        <span>@lang('invoice.currency') {{$sub_total}}</span>
                    </td>
                </tr>
                <tr>
                    <th style="text-align: left; font-size: 15px; padding: 5px 10px;">
                        <span contenteditable>@lang('invoice.tax')</span>
                    </th>
                    <td style="text-align: right; font-size: 15px; padding: 5px 10px;">
                        <span>@lang('invoice.currency') {{$tax}}</span>
                    </td>
                </tr>
                <tr>
                    <th style="text-align: left; font-size: 15px; padding: 5px 10px;">
                        <span contenteditable>@lang('invoice.coupon')</span>
                    </th>
                    <td style="text-align: right; font-size: 15px; padding: 5px 10px;">
                        <span>- @lang('invoice.currency') {{$coupon}}</span>
                    </td>
                </tr>
                <tr>
                    <th style="text-align: left; font-size: 15px; padding: 5px 10px;">
                        <span contenteditable>@lang('invoice.delivery_fee')</span>
                    </th>
                    @if($booking == false)
                        <td style="text-align: right; font-size: 15px; padding: 5px 10px;">
                            <span>@lang('invoice.currency') {{$delivery_fee}}</span>
                        </td>
                    @endif
                </tr>
                <tr>
                    <th style="text-align: left; font-size: 15px; padding: 5px 10px;">
                        <span contenteditable>@lang('invoice.total')</span>
                    </th>
                    <td style="text-align: right; font-size: 15px; padding: 5px 10px;">
                        <span>@lang('invoice.currency') {{$total}}</span>
                    </td>
                </tr>
            </table>
        </div>
    </section>
</main>
</body>
</html>

