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
    return render_template("viewall.html",
    location=mongo.db.locations.find())
    
@app.route('/location')
def location():
    return render_template("location.html")
   
"""show all records in a grid - user can then filter by category etc"""    
@app.route('/show_results')
def show_results():
    return render_template('searchresults.html')

@app.route('/view_location/<location_id>')
def view_location(location_id):
    single_location = mongo.db.locations.find_one({"_id": ObjectId(location_id)})
    all_regions = mongo.db.regions.find()
    return render_template('location.html', location=single_location, region=all_regions)
    
    
@app.route('/edit_task/<task_id>')
def edit_task(task_id):
    the_task = mongo.db.tasks.find_one({"_id": ObjectId(task_id)})
    all_catergories = mongo.db.categories.find()
    return render_template('edittask.html', task=the_task, categories=all_catergories)
    
    
    
    
    
    
    
    
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