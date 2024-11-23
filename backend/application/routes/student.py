from flask import jsonify, Blueprint

from application.models import User

student_route = Blueprint("student_route", __name__, url_prefix="/api/student")


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
