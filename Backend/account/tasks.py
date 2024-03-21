from Backend.celery import app
from django.core.mail import send_mail


@app.task()
def send_notification_mail(target_mail, message,
                           mail_subject="OTP AUTHENTICATING NaviGO"):
    print(message)
    print('dey evide yetthiaa')
    send_mail(
        subject=mail_subject,
        message=message,
        from_email="luttapimalayali@gmail.com",
        recipient_list=[target_mail],
        fail_silently=False,
    )
    return "Done"
