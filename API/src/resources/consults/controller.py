from flask_restful import Resource
from flask import request
import requests
import socket


class ConsultsController(Resource):
	def get(self):
		method, data = request.get_json()["method"].lower(), request.get_json()["data"].lower()
		
		if method == "ip":
			result = requests.get('https://ipwhois.app/json/' + data).json()
			if 'message' not in result and result["city"] != "Camaçari": return result, 200
			return {"message": "Esse IP é inválido"}, 200
		
		if method == 'portscan':
			message, ports = '', {
				21: 'ftp', 22: 'ssh', 23: 'telnet', 25: 'smtp', 53: 'domain', 80: 'http', 110: 'pop3', 111: 'rpcbind',
				135: 'RPC', 139: 'netbios', 143: 'imap', 443: 'https', 445: 'microsoft-ds', 993: 'imaps', 995: 'pop3s',
				1723: 'pptp', 3306: 'mysql', 3389: 'RDP', 5900: 'vnc', 8080: 'http-proxy'
			}
			
			for key, value in ports.items():
				s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
				s.settimeout(0.5)
				code = s.connect_ex((data, key))
				if code == 0: message += f'<b>Porta {key} {value}</b> >>> <code>Aberta</code>\n'
			
			if message != '': return {"message": message}, 200
			return {"message": "Não encontrei nenhuma porta aberta..."}, 200
