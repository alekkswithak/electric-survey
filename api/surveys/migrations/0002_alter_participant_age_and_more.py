# Generated by Django 4.0.1 on 2024-05-17 23:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participant',
            name='age',
            field=models.PositiveIntegerField(help_text='Enter your age in years'),
        ),
        migrations.AlterField(
            model_name='participant',
            name='credit_card_debt',
            field=models.CharField(help_text='Do you pay back the entirety of your credit card debt every month?', max_length=100),
        ),
        migrations.AlterField(
            model_name='participant',
            name='education',
            field=models.CharField(help_text='What is the highest level of education you have completed?', max_length=100),
        ),
        migrations.AlterField(
            model_name='participant',
            name='gender',
            field=models.CharField(help_text='Select your gender (e.g., Male, Female, Other)', max_length=10),
        ),
        migrations.AlterField(
            model_name='participant',
            name='household_income',
            field=models.CharField(help_text='What is your current household income?', max_length=100),
        ),
        migrations.AlterField(
            model_name='participant',
            name='occupation',
            field=models.CharField(help_text="What's your main occupation?", max_length=100),
        ),
        migrations.AlterField(
            model_name='participant',
            name='region',
            field=models.CharField(help_text='Enter the region where you reside', max_length=100),
        ),
        migrations.AlterField(
            model_name='participant',
            name='relationship_status',
            field=models.CharField(help_text='What is your current relationship status?', max_length=100),
        ),
        migrations.AlterField(
            model_name='participant',
            name='smoking_frequency',
            field=models.CharField(help_text='How often do you smoke cigarettes?', max_length=100),
        ),
        migrations.AlterField(
            model_name='participant',
            name='social_class',
            field=models.CharField(help_text='In which social class would you consider yourself?', max_length=100),
        ),
    ]
