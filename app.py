import os
from flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId 

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
    return render_template('viewall.html',
    locations=mongo.db.locations.find())
    
"""show all records in a grid - user can then filter by category etc"""    
@app.route('/show_results')
def show_results():
    return render_template('searchresults.html')
    
"""display an individuial location after it is clicked by user"""    
@app.route('/view_location/<location_id>')
def view_location(location_id):
    the_location = mongo.db.location.find_one({"_id": ObjectId(location_id)})
    all_regions = mongo.db.region.find()
    return render_template('location.html', location=the_location, area=all_regions)
    
 
"""add a new record for location - opens a form"""    
@app.route('/add_new')
def add_new():
    return render_template('newlocation.html',
    regions=mongo.db.region.find())
    
"""form thats opened when /add_new called""" 
@app.route('/new_location', methods=['POST'])
def new_location():
    locations = mongo.db.locations
    locations.insert_one(request.form.to_dict())
    return redirect(url_for('landing_page'))


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)