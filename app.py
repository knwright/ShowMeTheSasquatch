from flask import Flask, render_template
from flask_restplus import Api
import pymongo 
import pandas as pd
import os

# Read the data.
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db=client.Bigfootdb

# Restful flask app
app = Flask(__name__)
api = Api(app=app)


@api.route("/")
class mainpage():
    def get(self):
        return render_template("index.html")


@api.route("/visualizations")
class graphs():
    def get(self):


@api.route("data")
class data():
    def get(self):



if __name__ == "__main__":
    api.run(debug=True)
