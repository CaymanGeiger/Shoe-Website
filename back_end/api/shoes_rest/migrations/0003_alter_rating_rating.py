# Generated by Django 4.0.3 on 2023-12-12 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0002_cart_remove_shoe_sku_shoe_brand_shoe_color_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='rating',
            field=models.DecimalField(choices=[('1', '1'), ('1.5', '1.5'), ('2', '2'), ('2.5', '2.5'), ('3', '3'), ('3.5', '3.5'), ('4', '4'), ('4.5', '4.5'), ('5', '5')], decimal_places=1, max_digits=2, null=True),
        ),
    ]
