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
						<td class="alert alert-danger">
							Cancelled! 
						</td>
					</tr>
					<tr>
						<td class="content-wrap">
							<table width="100%" cellpadding="0" cellspacing="0">
								<tr>
									<td class="content-block">
										Hi {{staff_id[0].displayName}}, 

									</td>
								</tr>
								<tr>
									<td class="content-block">
										Your appointment  on {{appointment_date.date}} at {{appointment_date.time}} with {{client[0].displayName}} been cancelled. 

									</td>
								</tr>
	
								<tr>
									<td class="content-block" >
										Thanks, 
										<p>The Hander Team</p>
									
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<div class="footer">
					
				</div></div>
		</td>
		<td></td>
	</tr>
</table>

</body>

</html>