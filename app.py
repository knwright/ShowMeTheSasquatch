from flask import Flask, render_template, jsonify, make_response
from flask_restplus import Api, Resource
from pymongo import MongoClient
from flask_pymongo import PyMongo
import pandas as pd
import os
import csv
from bson.json_util import dumps
import json
from bson import ObjectId

# Restful flask app
app = Flask(__name__)
api = Api(app=app)
bigfoot = api.namespace ('BigFoot', description = 'BigFoot Sightings')

# Load the data from mongodb
conn = 'mongodb://localhost:27017/bigfootdb'
mongo_client = MongoClient(conn)
db = mongo_client.bigfootdb
collection = db.inventory

# Homepage route displaying the story
@bigfoot.route("/")
class mainpage(Resource):
    def get(self):
        """
        Displays the story of bigfoot
        """
        headers = {'Content-Type': 'text/html'}
        return make_response (render_template('index.html'),200,headers)

# Route displaying graphs
@bigfoot.route("/visualizations")
class graphs(Resource):
    def get(self):
        """
        Displays the graphs
        """
        return render_template("index.html")

# Route displaying data
@bigfoot.route("/data")
class data(Resource):
    def get(self):
        """
        Displays the data collection
        """

        # Read csv file
        csvfile = open('data/bfro_reports_geocoded.csv')
        records = csv.DictReader(csvfile)
        collection.drop()

        # Load data into Mongodb
        header= ["county", "state", "latitude", "longitude", "date", "number", "classification", "geohash", "temperature_high", "temperature_mid", "temperature_low",	"dew_point", "humidity", "cloud_cover",	"moon_phase", "precip_intensity", "precip_probability",	"precip_type", "pressure", "summary", "uv_index", "visibility",	"wind_bearing",	"wind_speed"]

        for each in records:
            row={}
            for shield in header:
                row[shield]=each[shield]
            collection.insert_one(row)
        
        # Query the data to show one record
            queries = collection.find()
        for row in queries:
            return dumps (row)

        
# Initialize app
if __name__ == "__main__":
    app.run(debug=True)
