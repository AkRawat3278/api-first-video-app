
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from itsdangerous import URLSafeSerializer
from extensions import mongo

from bson.objectid import ObjectId
import os

video_bp = Blueprint("video", __name__)
serializer = URLSafeSerializer(os.getenv("JWT_SECRET_KEY"))

@video_bp.route("/dashboard", methods=["GET"])
@jwt_required()
def dashboard():
    videos = mongo.db.videos.find({"is_active": True}).limit(2)
    res = []
    for v in videos:
        token = serializer.dumps(str(v["_id"]))
        res.append({
            "id": str(v["_id"]),
            "title": v["title"],
            "description": v["description"],
            "thumbnail": v["thumbnail_url"],
            "playback_token": token
        })
    return jsonify(res)

@video_bp.route("/video/<id>/stream")
@jwt_required()
def stream(id):
    token = request.args.get("token")
    video_id = serializer.loads(token)
    video = mongo.db.videos.find_one({"_id": ObjectId(video_id)})
    return jsonify(stream_url=f"https://www.youtube.com/embed/{video['youtube_id']}")
