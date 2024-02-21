from celery import shared_task
from django.core.mail import send_mail
# from redismail import settings
from Backend import settings


@shared_task
def send_notification_mail(target_mail, message):
    print('you reached here and you can go on with celery\n\n\n\n\n')
    mail_subject = "OTP AUTHENTICATING NaviGO"
    send_mail(
        subject=mail_subject,
        message=message,
        from_email="luttapimalayali@gmail.com",
        recipient_list=[target_mail],
        fail_silently=False,
    )
    return "Done"
