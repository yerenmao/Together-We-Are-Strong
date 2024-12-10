from flask import request, jsonify, Blueprint
from flask_login import login_user, logout_user, current_user, login_required

from application.app import bcrypt
from application.app import db
from application.models import User
from application.models import Department
from application.models import Course
from application.models import Section

import time

root_route = Blueprint("root", __name__, url_prefix="/api")


@root_route.route("/health", methods=["GET"])
def health():
    return jsonify({"message": "The server is running"})


@root_route.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        id, name, passwd = data["id"], data["name"], data["passwd"]
        hashed = bcrypt.generate_password_hash(passwd).decode("utf-8")
        result = User.query.filter(User.id == id).all()
        if len(result) == 0:
            return (jsonify({"error": "student ID not found"})), 401
        student = result[0]
        student.name = name
        student.passwd = hashed
        db.session.commit()

        return (
            jsonify(
                {
                    "message": "Success",
                }
            ),
            201,
        )
    except Exception as e:
        return jsonify({"message": f"Failed: {e}"}), 500


@root_route.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        id, passwd = data["id"], data["passwd"]

        student = User.query.filter(User.id == id).all()
        if len(student) == 0:
            return (jsonify({"error": "username not found"})), 401
        elif not bcrypt.check_password_hash(student[0].passwd, passwd):
            return (jsonify({"error": "wrong password"})), 401
        elif len(student) == 1:
            login_user(student[0])
            return (
                jsonify(
                    {
                        "id": current_user.id,
                        "name": current_user.name,
                        "role": current_user.role,
                    }
                ),
                202,
            )
        else:
            return jsonify({"message": "login failed"}), 500

    except Exception as e:
        return jsonify({"message": f"Failed: {e}"}), 500


@root_route.route("/logout", methods=["POST"])
def logout():
    logout_user()
    return "Success"


@root_route.route("/profile", methods=["GET"])
def profile():
    return (
        jsonify(
            {
                "id": current_user.id,
                "name": current_user.name,
                "role": current_user.role,
            }
        ),
        200,
    )
