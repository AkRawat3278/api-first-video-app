
from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from extensions import mongo

from bson.objectid import ObjectId

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")
bcrypt = Bcrypt()

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    hashed = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    mongo.db.users.insert_one({
        "name": data["name"],
        "email": data["email"],
        "password": hashed,
        "created_at": datetime.utcnow()
    })
    return jsonify(message="User created"), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    user = mongo.db.users.find_one({"email": request.json["email"]})
    if not user or not bcrypt.check_password_hash(user["password"], request.json["password"]):
        return jsonify(error="Invalid credentials"), 401
    token = create_access_token(identity=str(user["_id"]))
    return jsonify(access_token=token)

@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    uid = get_jwt_identity()
    user = mongo.db.users.find_one({"_id": ObjectId(uid)})
    return jsonify(name=user["name"], email=user["email"])

@auth_bp.route("/logout", methods=["POST"])
def logout():
    return jsonify(message="Logged out")
