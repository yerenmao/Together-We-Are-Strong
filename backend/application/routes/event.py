from flask import request, jsonify, make_response, Blueprint
from flask_login import current_user, login_required
from datetime import datetime

from application.app import db
from application.models import Section, Course, Event, ParticipateEvent

from application.routes.group import uuid2path, path2uuid

event_route = Blueprint("event_route", __name__, url_prefix="/api/event")


@event_route.route("/<eventid>", methods=["GET"])
def get(eventid):
    try:
        event = Event.query.filter(Event.id == eventid).first()
        return (
            jsonify(
                {
                    "message": "Success",
                    "event_name": event.name,
                    "course_name": event.getSection.getCourse.name,
                    "semester": event.getSection.semester,
                    "professor": event.getSection.getProfessor.name,
                }
            ),
            200,
        )
    except Exception as e:
        return jsonify({"message": f"Failed: {e}"}), 200


@event_route.route("/create/", methods=["POST"])
def create():
    try:
        data = request.get_json()
        post_path, post_message, post_semester, post_section, post_courseName = (
            data["path"],
            data["message"],
            data["semester"],
            data["section"],
            data["courseName"],
        )

        student_id = current_user.id
        group_id = path2uuid(post_path)

        query = Section.query.join(Course, Section.course_id == Course.id)
        query = query.filter(
            db.or_(
                Section.section_id.ilike(f"%{post_section}%"),
                Course.id.ilike(f"%{post_section}%"),
            )
        )
        section = query.filter(Section.semester == post_semester).first()
        event = Event(
            name=post_message,
            proposed_at=datetime.now(),
            student_id=student_id,
            group_id=group_id,
            section_id=section.id,
        )

        db.session.add(event)
        db.session.commit()

        return jsonify(
            {
                "message": "Success",
            }
        )

    except Exception as e:
        return jsonify({"message": f"Failed: {e}"}), 200


@event_route.route("/participate", methods=["POST"])
def participate():
    try:
        data = request.get_json()
        path, event_id, join = data["path"], data["eventid"], data["join"]

        part_event = ParticipateEvent.query.filter(
            db.and_(
                ParticipateEvent.student_id == current_user.id,
                ParticipateEvent.event_id == event_id,
            )
        ).first()

        if part_event:
            part_event.participate = True if join == 1 else False
            db.session.commit()
        else:
            new_part_event = ParticipateEvent(
                participate=True if join == 1 else False,
                student_id=current_user.id,
                event_id=event_id,
            )
            db.session.add(new_part_event)
            db.session.commit()

        return jsonify(
            {
                "message": "Success",
                "path": path,
                "event_id": event_id,
                "join": join,
                "exist": part_event is not None,
            }
        )

    except Exception as e:
        return jsonify({"message": f"Failed: {e}"}), 200


@event_route.route("/result/<eventid>", methods=["GET"])
def result(eventid):
    try:
        event = Event.query.filter(Event.id == eventid).first()
        part_event = ParticipateEvent.query.filter(
            ParticipateEvent.event_id == eventid
        ).all()
        res = {pe.getStudent.name: pe.participate for pe in part_event}
        return (
            jsonify(
                {
                    "message": "Success",
                    "data": res,
                    "event": event.name,
                    "semester": event.getSection.semester,
                    "section": event.getSection.getCourse.name,
                }
            ),
            200,
        )

    except Exception as e:
        return jsonify({"message": f"Failed: {e}"}), 200
