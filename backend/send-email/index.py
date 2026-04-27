import json
import os
import smtplib
import traceback

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

    print(f"Получена заявка: name={name}, contact={contact}")

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Заполните имя и контакт'})
        }

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    print(f"SMTP_PASSWORD задан: {bool(smtp_password)}, длина: {len(smtp_password)}")

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

    try:
        print("Подключаюсь к smtp.yandex.ru:465...")
        with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
            print("Авторизуюсь...")
            server.login(from_email, smtp_password)
            print("Отправляю письмо...")
            server.sendmail(from_email, to_email, msg.as_string())
            print("Письмо отправлено успешно!")
    except Exception as e:
        print(f"ОШИБКА SMTP: {e}")
        print(traceback.format_exc())
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': str(e)})
        }

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'ok': True})
    }
