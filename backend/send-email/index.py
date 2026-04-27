import json
import os
import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с формы на почту владельца студии"""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    contact = body.get('contact', '').strip()
    message = body.get('message', '').strip()

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Заполните имя и контакт'})
        }

    smtp_password = os.environ['SMTP_PASSWORD']
    from_email = 'snezhurova.olga@yandex.ru'
    to_email = 'snezhurova.olga@yandex.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка от {name}'
    msg['From'] = from_email
    msg['To'] = to_email

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #C9A96E;">Новая заявка с сайта</h2>
      <p><b>Имя:</b> {name}</p>
      <p><b>Контакт:</b> {contact}</p>
      <p><b>Сообщение:</b> {message or '—'}</p>
    </body></html>
    """
    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'ok': True})
    }