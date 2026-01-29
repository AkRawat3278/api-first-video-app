from flask import Flask
from flask_cors import CORS

from dotenv import load_dotenv
import os
from extensions import mongo, jwt

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["MONGO_URI"] = os.getenv("MONGO_URI")

mongo.init_app(app)
jwt.init_app(app)

from routes.auth import auth_bp
from routes.video import video_bp

app.register_blueprint(auth_bp)
app.register_blueprint(video_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

