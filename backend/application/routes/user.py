from flask import request, jsonify, make_response, Blueprint
from flask_login import current_user

from application.app import bcrypt
from application.app import db
from application.models import User

user_route = Blueprint("user_route", __name__, url_prefix="/api/user")


@user_route.route("/search", methods=["GET"])
def search():
    try:
        data = request.args.to_dict()
        string = data["query"]
        query = User.query.filter(User.department_id == current_user.department_id)
        query = query.filter(
            db.or_(User.name.ilike(f"%{string}%"), User.id.ilike(f"%{string}%"))
        )
        users = query.all()
        res = []
        for user in users:
            res.append(
                {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role,
                    "department": user.getDepartment.name,
                }
            )
        return jsonify({"message": "Success", "users": res}), 200
    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 500)


@user_route.route("/profile/<id>", methods=["GET"])
def profile(id):
    try:
        user = User.query.filter(User.id == id).first()
        res = {
            "id": user.id,
            "self": current_user.id == id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "department": user.getDepartment.name,
        }
        return jsonify({"message": "Success", "user": res}), 200
    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 200)


@user_route.route("/passwd", methods=["POST"])
def update_passwd():
    try:
        data = request.get_json()
        newpwd, confpwd = data["newpwd"], data["confpwd"]
        if newpwd != confpwd:
            raise Exception("Confirmation Failed")
        user = User.query.filter(User.id == current_user.id).first()
        user.passwd = bcrypt.generate_password_hash(newpwd).decode("utf-8")
        db.session.commit()
        return jsonify({"message": "Success", "pwd": newpwd}), 200
    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 200)


# update a user by id
@user_route.route("/<id>", methods=["PUT"])
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
@user_route.route("/<id>", methods=["DELETE"])
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
