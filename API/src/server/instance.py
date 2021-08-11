from flask import Flask
from flask_restful import Api
from pymongo import MongoClient


class Server:
	def __init__(self):
		self.app = Flask(__name__)
		self.api = Api(self.app)
		self.cluster = MongoClient("localhost", 27017)
		self.database = self.cluster["lara"]
		
	def run(self):
		self.app.run(debug=True)
	
	def initEndpoints(self):
		from src.resources.index import routes
		for route in routes: 
			self.api.add_resource(route[0], route[1])


server = Server()
server.initEndpoints()