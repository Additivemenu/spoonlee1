https://www.youtube.com/watch?v=nGIg40xs9e4

:bangbang: video not provide source code, just get the basic ideas, no need to run the code




+ setup a Django Project
+ COnfig URLs
+ Create database models
+ render dynamic Data with templates
+ Use the Django Admin panel



using Anaconda to manage python packages

to check project environment:
+ Use `conda info --envs`to list all Conda environments. The active environment is marked with an asterisk.
+ Use `conda install <package-name>` to install package under that environment


## create a new django project
`django-admin startproject demo`

```python
demo
    __init__.py: tell os to treat this directory as python
    asgi.py & wsgi.py: config for pyhton web
    settings.py: config manage installed apps, middlewares ...
    urls.py: url route config
maange.py: define a list of shell command, similar to scripts in package.json in node
```

## create an app
+ app are like module, each app is responsible for a type of business

```python
python manage.py startapp myapp  # this will create an app folder that contains necessary py files (e.g. models, tests, views apps...)
```


the routing structure is like 
```python
demo.urls: here a url is directed to an app, acting as an upper route
    |--- myapp.urls: here a url link is mapped to a view, act as a secondary route

```


## run app
```python
python manage.py runserver
```



## template 
11min-
use Jinjia as template engine for server side rendering









## database model

ORM

just like Spring Data JPA, allow you to query SQL database using python



database migration

+ evey time you update your databse structure, do a database migration to update that to your database



## Django admin panel

admin panel allows you to check app and database info, 就像node中socketio 的dashboard一样, 框架自动集成的一种交互界面

```python
python manage.py createsuperuser  # this create a admin, and you can access admin panel by visiting/admin
```





