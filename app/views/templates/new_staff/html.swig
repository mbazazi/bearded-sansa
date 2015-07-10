<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>New Staff Member</title>

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
						<td class="alert alert-danger">
							A New Potential Staff member has registered on the site. 
						</td>
					</tr>
					<tr>
						<td class="content-wrap">
							<table width="100%" cellpadding="0" cellspacing="0">
								<tr>
									<td class="content-block">
										Here are their details:

									</td>
								</tr>
								<tr>
									<td class="content-block">
										Staff Name: {{displayName}}<br>
										Email: {{email}}<br>
										Phone Number: {{phone}}
									</td>
								</tr>
								<tr>
									<td class="content-block">
									Address: 
									<address>
										{{address.main_address.street_1}}<br>
									   {{address.main_address.city}}<br>
										{{address.main_address.postcode}}<br>
										</address>
									</td>
								</tr>
								<tr>
									<td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler">
										Contact them immediately. 
									
									</td>
								</tr>
								<tr>
									<td class="content-block" >
										Best, 
										<p>Yourself</p>
									
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<div class="footer">
					<table width="100%">
						<tr>
							
						</tr>
					</table>
				</div></div>
		</td>
		<td></td>
	</tr>
</table>

</body>

</html>