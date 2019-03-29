from flask import Flask, render_template, jsonify
from flask_restplus import Api, Resource
import pymongo
from flask_pymongo import PyMongo
import pandas as pd
import os

# Restful flask app
app = Flask(__name__)
api = Api(app=app)
bigfoot = api.namespace ('BigFoot', description = 'BigFoot Sightings')

# Load the data from mongodb
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.bigfootdb
collection = db.bigfootdb

print(collection)

# Homepage route displaying the story
@bigfoot.route("/")
class mainpage(Resource):
    def get(self):
        """
        Displays the story of bigfoot
        """
        return ('Hello World')

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
        results = db.bigfootdb.find()
        for result in results:
            return results

if __name__ == "__main__":
    app.run(debug=True)