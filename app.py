#!/usr/bin/env python3
import os
import random
import re
from flask import (Flask, render_template, redirect,
    request, url_for)
from flask_pymongo import PyMongo
from flask_wtf import FlaskForm
from bson.objectid import ObjectId 
from bson.json_util import dumps
from ast import literal_eval

from os import path
if path.exists("env.py"):
    import env

app = Flask(__name__)

"""MongoDB - setting env variables"""
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")


mongo = PyMongo(app)

"""landing page/home"""
@app.route('/')

@app.route('/index')
def landing_page():
    return render_template("landingpage.html" )

"""show all records in a grid - user can then filter by category etc"""     
@app.route('/view_all')
def view_all():
    
    loc_types = list(mongo.db.location_type.find())
    summary = get_summary(loc_types)
    
    
    return render_template("viewall.html",
        location = list(mongo.db.locations.find()),
        loc_type = loc_types,
        region = list(mongo.db.region.find()),
        summary = summary)
            

def get_summary(loc_types):
    summary = {}
    for location_type in loc_types:
        print(location_type)
        summary[location_type['loc_type']] = [location for location in mongo.db.locations.find( { 'category': location_type['loc_type'] } ).limit( 3 )]
    return summary
    
@app.route('/location')
def location():
    
    return render_template("location.html")
   
"""show the individual record - pulls data from DB based on _id"""
@app.route('/view_location/<location_id>')
def view_location(location_id):
    single_location = mongo.db.locations.find_one({"_id": ObjectId(location_id)})
    all_regions = mongo.db.regions.find()
    
    return render_template('location.html', location=single_location, region=all_regions)
    
"""show the individual record - once review added"""
@app.route('/review_added/<location_id>', methods=["POST"])
def review_added(location_id):
    review = request.form['review']
    mongo.db.locations.update({"_id":ObjectId(location_id)},{"$push":{"reviews": review }})
    single_location = mongo.db.locations.find_one({"_id": ObjectId(location_id)})
    all_regions = mongo.db.regions.find()
    
    return render_template('location.html', location=single_location, region=all_regions)
    
"""show results based on location type selection"""
@app.route('/filteredtype', methods=["POST"])
def filteredtype():
    location_type = request.form['type-select']
    filtered_location = mongo.db.locations.find({"category": (location_type)}).sort("rating", -1)
    count = mongo.db.locations.find({"category": (location_type)}).count()
    
    return render_template('filteredresults.html', location = location_type, summary=filtered_location, count = count)
 

"""show results based on selected region"""
@app.route('/filteredregion', methods=["POST"])
def filteredregion():
    region_type = request.form['region-select']
    filtered_region = mongo.db.locations.find({"region": (region_type)}).sort("rating", -1)
    count = mongo.db.locations.find({"region": (region_type)}).count() 
    
    return render_template('filteredresults.html', location = region_type, summary=filtered_region, count = count)
    
"""add a new record for location - opens a form"""    
@app.route('/add_new')
def add_new():
    regions=mongo.db.region.find(),
    suited=mongo.db.best_suited.find(),
    loc_type=mongo.db.location_type.find()
    return render_template('newlocation.html', regions=regions, suited=suited, loc_type=loc_type)
    
"""form thats opened when /add_new called""" 
@app.route('/new_location', methods=['POST'])
def new_location():
    locations = mongo.db.locations
    locations.insert_one(request.form.to_dict())
    
    return redirect(url_for('landing_page'))
    
"""deletes the location and redirects to list of all"""
@app.route('/delete_location/<location_id>')
def delete_location(location_id):
    mongo.db.locations.remove({'_id': ObjectId(location_id)})
    
    return redirect(url_for('view_all'))

"""edit location - _id from DB"""
@app.route('/edit_location/<location_id>')
def edit_location(location_id):
    location = mongo.db.locations.find_one({"_id": ObjectId(location_id)})
    regions = mongo.db.region.find()
    loc_type = mongo.db.location_type.find()
    suited=mongo.db.best_suited.find()
    
    return render_template('editlocation.html', location=location, regions=regions, loc_type=loc_type, suited=suited)

@app.route('/update_location/<location_id>', methods=["POST"])
def update_location(location_id):
    location = mongo.db.locations
    location.update( {'_id': ObjectId(location_id)},
    {
        'name':request.form.get('name'),
        'address':request.form.get('address'),
        'region':request.form.get('region'),
        'category':request.form.get('category'),
        'best_suited':request.form.get('best_suited'),
        'wifi':request.form.get('wifi'),
        'plugs':request.form.get('plugs'),
        'drinks':request.form.get('plugs'),
        'pets_allowed':request.form.get('pets_allowed'),
        'offers':request.form.get('offers'),
        'photos':request.form.get('photos'),
        'rating': int(request.form['rating']),
        'description':request.form.get('description'),
        'city':request.form.get('city'),
    })
    
    return redirect(url_for('view_all'))

"""add a reveiw - _brings up form to add reveiw"""
@app.route('/add_review/<location_id>')
def add_review(location_id):
    location = mongo.db.locations.find_one({"_id": ObjectId(location_id)})
    
    return render_template('addreview.html', location=location)
   

if __name__ == '__main__':
    app.run(host='0.0.0.0',
            port=(os.environ.get('PORT')),
            debug=True)
            

