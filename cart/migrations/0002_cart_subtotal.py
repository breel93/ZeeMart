# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-06-14 05:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='subtotal',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=100),
        ),
    ]
