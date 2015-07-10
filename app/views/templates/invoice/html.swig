<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Billing e.g. invoices and receipts</title>
  {% block css %}
    <link rel="stylesheet" href="style.css">
  {% endblock %}
</head>

<body itemscope itemtype="http://schema.org/EmailMessage">

<table class="body-wrap">
    <tr>
        <td></td>
        <td class="container" width="600">
            <div class="content">
                <table class="main" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="content-wrap aligncenter">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td class="content-block">
                                        <h1 class="aligncenter">Hander Invoice</h1>
                                    </td>
                                </tr>
                                <tr>
                             
                                    <td class="content-block">
                                        <h1 class="aligncenter">${{cost.total_price}} Paid</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="content-block">
                                        <h2 class="aligncenter">Thanks for using Hander Inc.</h2>
                                        <table >
                                            <tr>
                                                 <td>
                                                     <p class="alignleft">Appointment Number: {{invoice_id}}</p>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                       
                                    </td>
                                </tr>
                                <tr>
                                    <td class="content-block aligncenter">
                                        <table class="invoice">
                                            <tr>
                                                <td>Client Name: {{client[0].displayName}}
                                                <p>Appointment Date: {{date}} {{time}}</p>
                                               <p> Total Time: {{total_time}} hours @ $125 per hour</p>
                                                </td>
                                                 
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table class="invoice-items" cellpadding="0" cellspacing="0">
                                                    
                                                     
                                                        <tr>
                                                            <td>Cost</td>
                                                            <td class="alignright">${{cost.dollars}}</td>
                                                           
                                                        </tr>
                                                        <tr>
                                                             <td> Tax/HST</td>
                                                            <td class="alignright">${{cost.tax}}</td>
                                                        </tr>
                                                       
                                                        <tr class="total">
                                                            <td class="alignleft" width="100%">Total</td>
                                                            <td class="alignright">${{cost.total_price}}</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="content-block aligncenter">
                                        <a href="http://www.mailgun.com">View in browser</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="content-block aligncenter">
                                       2k 150 Beverley Street, Toronto, ON, M5T 1Y5
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <div class="footer">
                    <table width="100%">
                        <tr>
                            <td class="aligncenter content-block">Questions? Email <a href="mailto:">support@hander.com</a></td>
                        </tr>
                    </table>
                </div></div>
        </td>
        <td></td>
    </tr>
</table>

</body>
</html>