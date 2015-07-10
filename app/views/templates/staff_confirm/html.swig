<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>New potential Client</title>

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
						<td class="alert alert-success">
							Confirmed! Your appointment has been confirmed. 
						</td>
					</tr>
					<tr>
						<td class="content-wrap">
							<table width="100%" cellpadding="0" cellspacing="0">
								<tr>
									<td class="content-block">
										Hi {{staff.displayName}}, 

									</td>
								</tr>
								<tr>
									<td class="content-block">
										Your appointment for on {{appointment_date.date}} at {{appointment_date.time}} has been confirmed. Your client's name is {{client.displayName}}, and their address is: <br>
										{{client.address.main_address.street_1}}<br>{{client.address.main_address.street_2}}<br> {{client.address.main_address.city}}<br>
										{{client.address.main_address.postcode}}<br>
									</td>
								</tr>
	
								<tr>
									<td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler">
										<p>Once you have completed the job, then just update the 'Job Done' switch and you're done. </p>
										
										<p> If you have any problems then feel free to contact us at: support@hander.com</p>
									
									</td>
								</tr>
								<tr>
									<td class="content-block" >
										Best, 
										<p>The Hander Team</p>
									
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<div class="footer">
					<table width="100%">
						<tr>
							<td class="aligncenter content-block"><a href="http://www.mailgun.com">Unsubscribe</a> from these alerts.</td>
						</tr>
					</table>
				</div></div>
		</td>
		<td></td>
	</tr>
</table>

</body>

</html>