from flask import request, jsonify, make_response, Blueprint
from flask_login import current_user, login_required
from datetime import datetime
import uuid

from application.app import db
from application.models import User, Group, JoinGroup

group_route = Blueprint("group_route", __name__, url_prefix="/api/group")


def uuid2path(u):
    return str(u).replace("-", "")


def path2uuid(p):
    if len(p) == 32:
        return uuid.UUID("-".join((p[:8], p[8:12], p[12:16], p[16:20], p[20:])))


@group_route.route("/<path>", methods=["GET"])
def list_group(path):
    try:
        group_id = path2uuid(path)
        join_groups = JoinGroup.query.filter(JoinGroup.group_id == group_id).all()
        students = [j.getStudent.name for j in join_groups]
        return (
            jsonify(
                {
                    "message": "Success",
                    "name": join_groups[0].getGroup.name,
                    "students": students,
                }
            ),
            200,
        )
    except Exception as e:
        return jsonify({"message": f"Failed: {e}"}), 200


@group_route.route("/create", methods=["POST"])
def create_group():
    try:
        data = request.get_json()
        group_id = uuid.uuid4()
        group_name = data["name"]
        group = Group(
            id=group_id,
            name=group_name,
            created_at=datetime.now(),
            student_id=current_user.id,
        )
        db.session.add(group)
        join_group = JoinGroup(
            student_id=current_user.id, group_id=group_id, joined_at=datetime.now()
        )
        db.session.add(join_group)
        db.session.commit()

        return jsonify({"message": "Success", "path": uuid2path(group_id)}), 200
    except Exception as e:
        return jsonify({"message": f"Failed: {e}"}), 200


@group_route.route("/mine", methods=["GET"])
def mine_group():
    try:
        join_groups = JoinGroup.query.filter(
            JoinGroup.student_id == current_user.id
        ).all()
        res = []
        for join_group in join_groups:
            group = join_group.getGroup
            res.append({"name": group.name, "path": uuid2path(group.id)})
        return jsonify({"message": "Success", "groups": res}), 200
    except Exception as e:
        return jsonify({"message": f"Failed: {e}"}), 200


@group_route.route("/join", methods=["POST"])
def join_group():
    try:
        data = request.get_json()
        group_id = path2uuid(data["path"])
        group = Group.query.filter(Group.id == group_id).first()
        if group is None:
            return jsonify({"message": "Not Found"}), 200
        join_group = JoinGroup(
            student_id=current_user.id, group_id=group_id, joined_at=datetime.now()
        )
        db.session.add(join_group)
        db.session.commit()
        return jsonify({"message": "Success"}), 200
    except Exception as e:
        return jsonify({"message": f"Failed: {e}"}), 200
