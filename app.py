from csv import DictReader
from flask import Flask, render_template
from flask_restplus import Api
from toolz import compose, pluck, groupby, valmap, first, unique, get, countby
import datetime as dt
# from dotenv import find_dotenv,load_dotenv
import pymongo 
import pandas as pd
import os
################################################################################
# APP INITIALIZATION
################################################################################
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


# For Heroku deployment
server = api.server
server.secret_key = os.environ.get("SECRET_KEY", "secret")


if __name__ == "__main__":
    api.run(debug=True)
