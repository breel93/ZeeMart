# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-10-03 06:44
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0012_auto_20181003_0238'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='More_Images',
            new_name='MoreImages',
        ),
        migrations.AlterModelOptions(
            name='moreimages',
            options={'verbose_name': 'MoreImage', 'verbose_name_plural': 'MoreImages'},
        ),
    ]
