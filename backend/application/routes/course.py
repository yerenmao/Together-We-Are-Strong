from flask import request, jsonify, make_response, Blueprint
from flask_login import current_user

from application.app import db
from application.models import Section, Course, Department, IsTA


course_route = Blueprint("course_route", __name__, url_prefix="/api/course")

@course_route.route("/search", methods=["GET"])
def search():
    try:
        courses = Course.query.filter(Course.department_id == current_user.department_id).all()
        res = []
        for course in courses:
            res.append({
                "id": course.id,
                "name": course.name,
                "credits": course.credits,
                "type": course.type,
            })
        return jsonify({"message": "Success","courses": res,}), 200
    except Exception as e:
        return make_response(jsonify({"error": repr(e)}), 200)

@course_route.route("/create", methods=["POST"])
def create():
    try:
        data = request.get_json()
        cid, cname, credits, ctype = data["id"], data["name"], data["credits"], data["type"]
        course = Course(id=cid, name=cname, credits=credits, type=ctype, department_id=current_user.getDepartment.id)
        db.session.add(course)
        db.session.commit()
        return jsonify({"message": "Success"}), 200
    except Exception as e:
        return make_response(jsonify({"error": repr(e)}), 200)
