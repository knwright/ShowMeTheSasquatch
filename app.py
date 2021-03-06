from flask import Flask, render_template, jsonify, make_response
from flask_restplus import Api, Resource
from pymongo import MongoClient
from flask_pymongo import PyMongo
import pandas as pd
import os
import csv
from bson.json_util import dumps
import json
from bson import ObjectId, json_util

# Restful flask app
app = Flask(__name__)
api = Api(app=app)
bigfoot = api.namespace ('BigFoot', description = 'BigFoot Sightings')

# Create connection to MongoDB
conn = 'mongodb://localhost:27017/bigfootdb'
mongo_client = MongoClient(conn)
db = mongo_client.bigfootdb
collection = db.inventory


# Homepage route with dropdowns
@bigfoot.route("/")
class mainpage(Resource):
    def get(self):
        """
        Bigfoot Homepage
        """
        headers = {'Content-Type': 'text/html'}
        return make_response (render_template('index_el.html'),200,headers)

# Homepage route with dropdowns
@bigfoot.route("/index_dk.html")
class scatter(Resource):
    def get(self):
        """
        Bigfoot Homepage
        """
        headers = {'Content-Type': 'text/html'}
        return make_response (render_template('index_dk.html'),200,headers)

# Homepage route with dropdowns
@bigfoot.route("/index_kw.html")
class heatmap(Resource):
    def get(self):
        """
        Bigfoot Homepage
        """
        headers = {'Content-Type': 'text/html'}
        return make_response (render_template('index_kw.html'),200,headers)

# Homepage route with dropdowns
@bigfoot.route("/index_jm.html")
class barplot(Resource):
    def get(self):
        """
        Bigfoot Homepage
        """
        headers = {'Content-Type': 'text/html'}
        return make_response (render_template('index_jm.html'),200,headers)

# Route displaying data
@bigfoot.route("/data")
class data(Resource):
    def get(self):
        """
        Queries the data collection
        """
        
        # Read csv file
        csvfile = open('static/data/bfro_reports_geocoded.csv')
        records = csv.DictReader(csvfile)
        collection.drop()

        # Load data into Mongodb
        header = ["county", "state", "latitude", "longitude", "date", "number", "classification", "geohash", "temperature_high", "temperature_mid", "temperature_low",	"dew_point", "humidity", "cloud_cover",	"moon_phase", "precip_intensity", "precip_probability",	"precip_type", "pressure", "summary", "uv_index", "visibility",	"wind_bearing",	"wind_speed"]

        for each in records:
            row={}
            for field in header:
                row[field]=each[field]
            collection.insert(row)
        
        fields = {
            "county": True, "state":True, "latitude": True, "longitude":True, "date":True, "number":True, 
            "classification":True, "geohash":True, "temperature_high":True, "temperature_mid":True, 
            "temperature_low":True,	"dew_point":True, "humidity":True, "cloud_cover":True,	"moon_phase":True,
            "precip_intensity":True, "precip_probability":True,	"precip_type":True, "pressure":True, "summary":True, 
            "uv_index":True, "visibility":True,	"wind_bearing":True, "wind_speed":True, "_id":False
            }

        sightings = collection.find(projection=fields)
        json_sightings = []
        for sighting in sightings:
            json_sightings.append(sighting)
        # json_sightings=json.dumps(json_sightings, default=json_util.default)
        return jsonify(json_sightings)


# Initialize app
if __name__ == "__main__":
    app.run(debug=True)
