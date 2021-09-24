from src.services.chat.chat_processor import get_best_context
from flask_restful import Resource
from flask import request


class ChatController(Resource):
  def get(self):
    __message = request.get_json()["message"].lower()
    __contexts_array = request.get_json()["contexts"]

    return { "results":get_best_context(__contexts_array, __message) }