"""
webserver.py

File that is the central location of code for your webserver.
"""

from flask import Flask, redirect, render_template, request, abort
import os
from os import environ
import json
import requests

# Create application, and point static path (where static resources like images, css, and js files are stored) to the
# "static folder"

app = Flask(__name__,static_url_path="/static")
@app.route('/f', methods=['POST'])
def form():
	data = json.loads(request.data.decode('ascii'))
	r=requests.post(
        'https://api.mailgun.net/v3/{}/messages'.format(URL),
        auth=(environ["INFO253_MAILGUN_USER"], environ["INFO253_MAILGUN_PASSWORD"]),
        data={"from": data['name'] + " " + environ["INFO253_MAILGUN_FROM_EMAIL"],
              "to": environ["INFO253_MAILGUN_TO_EMAIL"],
              "subject": data['subject'],
              "text": data['msg'] +
                     '\n Please reply to ' + data['email'] + ' directly.'})
	return ('', 204)


@app.route('/')
def root():
    """
    If someone goes to the root of your website (i.e. http://localhost:5000/), run this function. The string that this
    returns will be sent to the browser
    """
    return redirect("/index", code=302)

@app.route('/index')
def index():
    return render_template("index.html") # Render the template located in "templates/index.html"

@app.route('/AboutUs')
def about():
	return render_template("AboutUs.html")

@app.route('/ContactUs')
def contact():
	return render_template("ContactUs.html")

@app.route('/posts/<fname>')
def blog(fname):
	return render_template(fname + '.html')

@app.route('/weather')
def weather():
  return render_template('weather.html')

@app.route('/comment')
def comment():
	return render_template("comment.html")
