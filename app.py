from flask import Flask, jsonify
import random

app = Flask(__name__)

fortunes = [
    "A surprise is waiting for you today.",
    "Someone will compliment your style.",
    "Expect good news in the next 24 hours.",
    "Your creativity will shine soon.",
    "Take a chance, it will pay off.",
    "A new opportunity is on the horizon."
]

@app.route('/get_fortune')
def get_fortune():
    return jsonify({"fortune": random.choice(fortunes)})

if __name__ == "__main__":
    app.run(debug=True)
