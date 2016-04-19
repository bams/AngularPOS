# -*- coding: utf-8 -*-

from flask import Flask, session
from flask import render_template, flash, redirect, request, url_for, abort, send_from_directory
import sqlite3
from sqlite3 import OperationalError
from flask import g

app = Flask(__name__)
app.secret_key = 'itsasecret'

### DB ###

DATABASE = 'db/db.sqlite'

# This function connects the db
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        #connect sqlite
        db = g._database = sqlite3.connect(DATABASE)
        #turn row results into a dict
        db.row_factory = make_dicts
        #init the db and make tables if they dont already exist
        init_db()
    return db

# This function connects db, executes sql string, then returns results
def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

# This function turns sqlite result rows into a dict with key:value pairs
# like this: results= { col_name : value }
# It's used when the db connection is initiated in get_db()
def make_dicts(cur, row):
    return dict((cur.description[idx][0], value)
                for idx, value in enumerate(row))

# This function (with generator context) is what ensures the db connection is
# closed after a view runs logic that requires the db
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# This function creates the db with tables if they doesnt already exist.
def init_db():
    db = get_db()
    try:
        #on first run, create tables
        db.execute('CREATE TABLE "users" ("username" TEXT, "email" TEXT, "user_id" TEXT)')
        db.commit()
        pass
    except OperationalError as e:
        #on successive run, handle the exception and continue on using the existing tables
        pass
        
### END: DB ###


#
# Example sqlite3 queries within a Flask view (db connection is closed after return)
#

menu = {
    'items':[{'name':'burger',
              'price':12.50,
              'category':['sandwiches', 'most popular',]},
             {'name':'fries',
              'price':4.25,
              'category':['sides',]},
             {'name':'soda',
              'price':2.50,
              'category':['drinks', 'most popular',]}]}

menu2 = {
    'categories':{
        'Sandwiches':[{
            'name':'Burger',
            'price':12.50 },
                      {
            'name':'Gyro',
            'price':9.75},
                      {
            'name':'Turkey',
            'price':10.89},],
        
        'Sides':[{
            'name':'Fries',
            'price':3.25},
                 {
            'name':'Side Salad',
            'price':4.50},],
        
        'Drinks':[{
            'name':'Soda',
            'price':2.50},
                  {
            'name':'Beer',
            'price':6.50},
                  {
            'name':'Water',
            'price':0},],}
    }

menu2['all_categories'] = [i for i in menu2['categories']]

catList = [item['category'] for item in menu['items']]
uCats = []
for l in catList:
    for item in l:
        if item not in uCats:
            uCats.append(item)

cats = {'categories':uCats}

@app.route('/')
def main():
    return render_template('rPOS.html', menu=menu, menu2=menu2, categories=cats)

if __name__ == "__main__":

    app.run(debug=True)
