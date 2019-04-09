import os
from flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId 
from bson.json_util import dumps
from ast import literal_eval

app = Flask(__name__)
app.config["MONGO_DBNAME"] = 'projectThree'
app.config["MONGO_URI"] = os.getenv('MONGO_URI', 'mongodb+srv://newuser:newuser@myfirstcluster-wrvet.mongodb.net/projectThree?retryWrites=true')

mongo = PyMongo(app)

"""landing page/home"""
@app.route('/')
@app.route('/landing_page')
def landing_page():
    return render_template("landingpage.html",
    users=mongo.db.users.find())

"""show all records in a grid - user can then filter by category etc"""     
@app.route('/view_all')
def view_all():
    summary = get_categories()
    return render_template("viewall.html",
        location = mongo.db.locations.find(),
        loc_type = mongo.db.location_type.find(),
        region = mongo.db.region.find(),
        summary = summary)
  
def get_categories():
    locations = {}
    try:
        # Query recipes collection and return ordered by _id descending
        locations = [location for location in mongo.db.locations.find( { 'category': "cafe" } )]
    except:
        return print("error finding locations")

    if locations:
        # return three locations
        return locations
        
    return 


def get_locations():
    loc_types = {}
    summary = {}
    selection = {}
   
    try:
        selection = dumps(mongo.db.location_type.find())
        print(type(selection))
        print (selection)
        loc_types = selection
        print (loc_types)
   
    
        [{"_id": {"$oid": "5c9bd0851c9d44000016fda1"}, "loc_type": "cafe"},
        {"_id": {"$oid": "5c9bd09a1c9d44000016fda2"}, "loc_type": "restaurant"}, 
        {"_id": {"$oid": "5c9bd0b21c9d44000016fda3"}, "loc_type": "library"}, 
        {"_id": {"$oid": "5c9bd0c61c9d44000016fda4"}, "loc_type": "community space"}]
        
    except:
        print("error finding locations in step one")
    
        for locations in loc_types:
            try:
                summary = dumps(mongo.db.locations.find( { "loc_type": "loc_type" } ))
                print("found summary")
                return summary
        
            except:
                return print("error finding locations")

            if locations:
                # return three locations
                return locations

get_locations()
  
@app.route('/location')
def location():
    return render_template("location.html")
   
"""show the individual record - pulls data from DB based on _id"""
@app.route('/view_location/<location_id>')
def view_location(location_id):
    single_location = mongo.db.locations.find_one({"_id": ObjectId(location_id)})
    all_regions = mongo.db.regions.find()
    return render_template('location.html', location=single_location, region=all_regions)
    
"""add a new record for location - opens a form"""    
@app.route('/add_new')
def add_new():
    return render_template('newlocation.html',
    regions=mongo.db.region.find(),
    suited=mongo.db.best_suited.find(),
    loc_type=mongo.db.location_type.find())
    
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
        'description':request.form.get('description')
    })
    return redirect(url_for('view_all'))

def cat_summary():
    """function that takes the loc_type eg cafe and finds places that match and then"""
    return """an array of 4 places"""


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)