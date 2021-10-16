# Description

JustStreamIt is a platform to display informations about movies. For each movie, you see details (actors, directors, year of release, income, critics and imdb score...).

In this program, you can change which genres and how many movies you want to display.

# Prerequisites

Python 3

# Installation

On Linux or Mac
```console
pip install virtualenv
virtualenv venv --python=python3
source venv/bin/activate
pip install -r requirements.txt
```

On Windows
```console
c:\Python38\python -m venv c:\path\to\myenv
C:\\{venv}\\Scripts\\activate.bat
pip install -r requirements.txt
```

# Quickstart

To get the API, you need to clone the [repo](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR) and run it

```console
python manage.py runserver
```
When you launch this command, it will start the OCMovies API. It contains all movies in a database.

If you want to change the CSS file, first step is to install [nodejs](https://nodejs.org/en/) and then you can write in the SCSS file just after running npm.

```
npm run sass
```
It is not mandatory because you can write in the CSS file

# Contributor

If you have any suggestions to improve the project, you can create an issue.
