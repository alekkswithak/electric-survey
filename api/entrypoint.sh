#!/bin/sh

echo "Making migrations..."
pipenv run python manage.py makemigrations

echo "Applying migrations..."
pipenv run python manage.py migrate

echo "Creating superuser..."
pipenv run python manage.py createsuperuser --no-input

echo "Populating participants from data.csv..."
pipenv run python manage.py populate_participants data.csv

echo "Starting Django server..."
pipenv run python manage.py runserver 0.0.0.0:8000
