# Generated by Django 5.0.1 on 2024-03-17 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0003_remove_ticketorder_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticketorder',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='ticketorder',
            name='sub_total',
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='ticketorder',
            name='tax',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='ticketorder',
            name='total',
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
    ]
