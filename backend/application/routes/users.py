from flask import request, jsonify, make_response, Blueprint

from application.app import db
from application.models import User

users_route = Blueprint("users_route", __name__, url_prefix="/api/flask/users")


# create a user
@users_route.route("", methods=["POST"])
def create_user():
    try:
        data = request.get_json()
        new_user = User(name=data["name"], email=data["email"])
        db.session.add(new_user)
        db.session.commit()

        return (
            jsonify(
                {"id": new_user.id, "name": new_user.name, "email": new_user.email}
            ),
            201,
        )

    except Exception as e:
        return make_response(
            jsonify({"message": "error creating user", "error": str(e)}), 500
        )


# get all users
@users_route.route("/", methods=["GET"])
def get_users():
    try:
        users = User.query.all()
        users_data = [
            {"id": user.id, "name": user.name, "email": user.email} for user in users
        ]
        return jsonify(users_data), 200
    except Exception as e:
        return make_response(
            jsonify({"message": "error getting users", "error": str(e)}), 500
        )


# get a user by id
@users_route.route("/<id>", methods=["GET"])
def get_user(id):
    try:
        user = User.query.filter_by(id=id).first()  # get the first user with the id
        if user:
            return make_response(jsonify({"user": user.json()}), 200)
        return make_response(jsonify({"message": "user not found"}), 404)
    except Exception as e:
        return make_response(
            jsonify({"message": "error getting user", "error": str(e)}), 500
        )


# update a user by id
@users_route.route("/<id>", methods=["PUT"])
def update_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            data = request.get_json()
            user.name = data["name"]
            user.email = data["email"]
            db.session.commit()
            return make_response(jsonify({"message": "user updated"}), 200)
        return make_response(jsonify({"message": "user not found"}), 404)
    except Exception as e:
        return make_response(
            jsonify({"message": "error updating user", "error": str(e)}), 500
        )


# delete a user by id
@users_route.route("/<id>", methods=["DELETE"])
def delete_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response(jsonify({"message": "user deleted"}), 200)
        return make_response(jsonify({"message": "user not found"}), 404)
    except Exception as e:
        return make_response(
            jsonify({"message": "error deleting user", "error": str(e)}), 500
        )
