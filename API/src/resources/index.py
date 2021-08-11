from src.resources.chatSystem.controller import ChatController
from src.resources.consults.controller import ConsultsController

routes = [
	[ChatController, "/chat"],
	[ConsultsController, "/consults"],
]