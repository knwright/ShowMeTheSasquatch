from csv import DictReader
from flask import Flask
from toolz import compose, pluck, groupby, valmap, first, unique, get, countby
import datetime as dt
from dotenv import find_dotenv,load_dotenv

import os


################################################################################
# APP INITIALIZATION
################################################################################
# Read the data.


fin = open('data/bfro_report_locations.csv', 'r')
reader = DictReader(fin)
BFRO_LOCATION_DATA = [
    line for line in reader
]
fin.close()

# Flask app
app = Flask(__name__)

# For Heroku deployment
server = app.server
server.secret_key = os.environ.get("SECRET_KEY", "secret")

