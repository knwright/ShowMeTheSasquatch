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

# Homepage route displaying the story
@api.route("/")
class mainpage():
    def get(self):
        return render_template("index.html")

# Route displaying graphs
@api.route("/visualizations")
class graphs():
    def get(self):
        return render_template("index.html")

# Route displaying data
@api.route("data")
class data():
    def get(self):
        return render_template("index.html")



if __name__ == "__main__":
    api.run(debug=True)
