from src.resources.chatSystem.chat_processor import chat_processor
from flask_restful import Resource
from flask import request


class ChatController(Resource):
	def get(self):
		__message = request.get_json()["message"].lower()
		return {"results":chat_processor.chat_tfidf(__message)}