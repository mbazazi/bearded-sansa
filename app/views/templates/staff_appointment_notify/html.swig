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
						<td class="alert alert-warning">
							We've had a request for an RMT. Check the details below
						</td>
					</tr>
					<tr>
						<td class="content-wrap">
							<table width="100%" cellpadding="0" cellspacing="0">
								<tr>
									<td class="content-block">
										Hi {{displayName}}, 

									</td>
								</tr>
								<tr>
									<td class="content-block">
										Someone has requested an RMT. Below are the appointment details. 
									</td>
								</tr>
								<tr>
									<td class="content-block alignleft">
										Client Name: {{clientname}}<br>
										Appointment Date: {{date}} at {{time}}<br>
										Address: {{client_address}}<br>
										Rate: {{cost}}<br>
									</td>
								</tr>
								<tr>
									<td>
										<img src="{{mapUrlString}}">
									</td>
								</tr>
								<tr>
									<td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler">
										If you'd like to claim this appointment, then click the button below.
										<button class="btn-primary" href="{{acceptUrl}}">Accept</button></br>
										<p> If the link above does not work, then copy and paste the following into your browser: </br>{{acceptUrl}}</p>
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