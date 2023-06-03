import os
from email.message import EmailMessage
import ssl
import smtplib


def send_mail`(to, subject, body):
    sender = "clickviralng@gmail.com"
    recipient = to
    password = "wflwidljzrykjswq"

    mail = EmailMessage()
    mail["From"] = sender
    mail["To"] = recipient
    mail["Subject"] = subject

    mail.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
        smtp.login(sender, password)
        smtp.sendmail(sender, recipient, mail.as_string())

def send_mails(to, subject, body):
    # Set the necessary information
    smtp_server = 'smtp.clickviral.tech'
    smtp_port = 25  # Default SMTP port for TLS
    username = 'contact@clickviral.tech'
    password = 'Adeope0605'

    # Set up the connection to the SMTP server
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(username, password)
    except smtplib.SMTPException as e:
        print(f'Error: Could not connect to the SMTP server. {str(e)}')
        exit()

    # Compose the email message
    sender = username
    recipient = to
    message = body

    email_body = f'''From: {sender}
    To: {recipient}
    Subject: {subject}

    {message}'''

    # Send the email
    try:
        server.sendmail(sender, recipient, email_body)
        print('Email sent successfully!')
    except smtplib.SMTPException as e:
        print(f'Error: Could not send the email. {str(e)}')

    # Close the connection to the SMTP server
    server.quit()
