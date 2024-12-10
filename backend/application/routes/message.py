from flask import request, jsonify, make_response, Blueprint
from flask_login import current_user, login_required
from datetime import datetime

from application.app import db
from application.models import User, Group, JoinGroup, Message, Event

from application.routes.group import uuid2path, path2uuid

message_route = Blueprint("message_route", __name__, url_prefix="/api/message")


@message_route.route("/<path>", methods=["GET"])
def list_group(path):
    try:
        messages = Message.query.filter(
            db.and_(Message.group_id == uuid2path(path))
        ).all()
        events = Event.query.filter(db.and_(Event.group_id == uuid2path(path)))
        res = []

        for message in messages:
            res.append(
                {
                    "type": "message",
                    "message": message.message,
                    "student_id": message.getStudent.id,
                    "student": message.getStudent.name,
                    "sent_at": message.sent_at,
                    "is_mine": message.student_id == current_user.id,
                }
            )

        for event in events:
            res.append(
                {
                    "type": "event",
                    "event_id": event.id,
                    "event_name": event.name,
                    "student_id": message.getStudent.id,
                    "student": event.getStudent.name,
                    "sent_at": event.proposed_at,
                    "is_mine": event.student_id == current_user.id,
                }
            )

        res.sort(key=lambda x: x["sent_at"])
        return jsonify({"message": "Success", "data": res}), 200
    except Exception as e:
        return jsonify({"message": f"Failed: {e}"}), 200


@message_route.route("/create", methods=["POST"])
def create_group():
    try:
        data = request.get_json()
        message = Message(
            message=data["message"],
            sent_at=datetime.now(),
            student_id=current_user.id,
            group_id=path2uuid(data["path"]),
        )
        db.session.add(message)
        db.session.commit()

        return jsonify({"message": "Success", "data": repr(message)}), 200
    except Exception as e:
        return jsonify({"message": f"Failed: {e}"}), 200
