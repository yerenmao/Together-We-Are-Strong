from flask import jsonify, Blueprint, make_response

from application.app import db
from application.models import User

student_route = Blueprint("student_route", __name__, url_prefix="/api/student")

@student_route.route("/<id>", methods=["GET"])
def get(id):
    try:
        student = User.query.filter(db.and_(User.id == id, User.role == "student")).first()
        return jsonify({
            "message": "Success",
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "department": student.getDepartment.name,
            "department_trivial": student.getDepartment.trivial_name
        }), 200
    except Exception as e:
        return make_response(jsonify({"error": repr(e)}), 200)

@student_route.route("/list", methods=["GET"])
def list():
    try:
        students = User.query.all()
        data = [
            {"id": s.id, "name": s.name, "passwd": s.passwd, "email": s.email}
            for s in students
            if s.role == "student"
        ]
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"message": f"Failed: {e}"}), 500
