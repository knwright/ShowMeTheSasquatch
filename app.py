from csv import DictReader
from flask import Flask
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


# Flask app
app = Flask(__name__)

# For Heroku deployment
server = app.server
server.secret_key = os.environ.get("SECRET_KEY", "secret")

