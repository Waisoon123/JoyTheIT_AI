# server.py (using Flask as an example)
from flask import Flask, request, jsonify
import requests

API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    message = request.json['message']
    chat_history = []  # Store the chat history in-memory for simplicity

    payload = {
        'messages': [{'role': 'system', 'content': 'You are a user'}, {'role': 'user', 'content': message}],
        'model': 'gpt-3.5-turbo',
        'chat_history': chat_history
    }

    response = requests.post(API_ENDPOINT, json=payload, headers={'Authorization': 'Bearer YOUR_API_KEY'})
    response_json = response.json()

    chat_history.append(response_json['choices'][0]['message'])
    return jsonify(response_json['choices'][0]['message']['content'])

