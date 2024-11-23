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


# @root_route.route("/register", methods=["POST"])
# def register():
#     # try:
#     data = request.get_json()
#     hashed = bcrypt.generate_password_hash(data["passwd"]).decode("utf-8")
#     student = User(id=data["id"], name=data["name"], passwd=hashed)
#     db.session.add(student)
#     db.session.commit()

#     return (
#         jsonify(
#             {
#                 "message": "Success",
#             }
#         ),
#         201,
#     )


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
    return jsonify({"id": current_user.id, "name": current_user.name}), 200


@root_route.route("/create_user", methods=["POST"])
def create_user():
    try:
        users = [
            {
                "id": "B11902173",
                "name": "陳順霙",
                "email": "b11902173@ntu.edu.tw",
                "passwd": "chen0412",
                "department_id": "9020",
                "role": "student",
            },
            {
                "id": "B10303102",
                "name": "莫仲軒",
                "email": "b10303102@ntu.edu.tw",
                "passwd": "momo",
                "department_id": "3030",
                "role": "student",
            },
            {
                "id": "B10702098",
                "name": "徐子晴",
                "email": "b10702098@ntu.edu.tw",
                "passwd": "kiou",
                "department_id": "7020",
                "role": "student",
            },
            {
                "id": "htlin",
                "name": "林軒田",
                "email": "htlin@ntu.edu.tw",
                "passwd": "htlin",
                "department_id": "9020",
                "role": "prof",
            },
            {
                "id": "P98765432",
                "name": "楊承甫",
                "email": "cyang@ntu.edu.tw",
                "passwd": "yangpassword",
                "department_id": "7020",
                "role": "prof",
            },
            {
                "id": "S11111111",
                "name": "陳德安",
                "email": "dchen@ntu.edu.tw",
                "passwd": "dchen123",
                "department_id": "1010",
                "role": "prof",
            },
            {
                "id": "T22222222",
                "name": "李志勇",
                "email": "zli@ntu.edu.tw",
                "passwd": "zlipass",
                "department_id": "1010",
                "role": "prof",
            },
            {
                "id": "M33333333",
                "name": "資訊工程學系",
                "email": "admin9020@ntu.edu.tw",
                "passwd": "adminpass9020",
                "department_id": "9020",
                "role": "admin",
            },
            {
                "id": "F44444444",
                "name": "經濟學系",
                "email": "admin3030@ntu.edu.tw",
                "passwd": "adminpass3030",
                "department_id": "3030",
                "role": "admin",
            },
            {
                "id": "E55555555",
                "name": "會計學系",
                "email": "admin7020@ntu.edu.tw",
                "passwd": "adminpass7020",
                "department_id": "7020",
                "role": "admin",
            },
            {
                "id": "C66666666",
                "name": "法律學系",
                "email": "admin1010@ntu.edu.tw",
                "passwd": "adminpass1010",
                "department_id": "1010",
                "role": "admin",
            },
            {
                "id": "B10640409",
                "name": "郭智鈞",
                "email": "b10640409@ntu.edu.tw",
                "passwd": "guopass",
                "department_id": "6060",
                "role": "student",
            },
            {
                "id": "B10880888",
                "name": "賴彥霖",
                "email": "b10880888@ntu.edu.tw",
                "passwd": "laipass",
                "department_id": "8080",
                "role": "student",
            },
            {
                "id": "G77777777",
                "name": "康美茹",
                "email": "mkang@ntu.edu.tw",
                "passwd": "kangsecure",
                "department_id": "4040",
                "role": "prof",
            },
            {
                "id": "H88888888",
                "name": "心理學系",
                "email": "admin4040@ntu.edu.tw",
                "passwd": "adminpass4040",
                "department_id": "4040",
                "role": "admin",
            },
            {
                "id": "R19384049",
                "name": "國際企業學系",
                "email": "admin6060@ntu.edu.tw",
                "passwd": "adminpass6060",
                "department_id": "6060",
                "role": "admin",
            },
            {
                "id": "R37492719",
                "name": "電機工程學系",
                "email": "admin8080@ntu.edu.tw",
                "passwd": "adminpass8080",
                "department_id": "8080",
                "role": "admin",
            },
            {
                "id": "B10503157",
                "name": "劉偉哲",
                "email": "b10503157@ntu.edu.tw",
                "passwd": "liu123",
                "department_id": "3030",
                "role": "student",
            },
            {
                "id": "B10710101",
                "name": "黃佩琪",
                "email": "b10710101@ntu.edu.tw",
                "passwd": "huangpass",
                "department_id": "1010",
                "role": "student",
            },
            {
                "id": "B10890201",
                "name": "林志成",
                "email": "b10890201@ntu.edu.tw",
                "passwd": "linpass",
                "department_id": "9020",
                "role": "student",
            },
        ]
        for user in users:
            hashed = bcrypt.generate_password_hash(user["passwd"]).decode("utf-8")
            department = Department.query.filter(
                Department.id == user["department_id"]
            ).first()
            student = User(
                id=user["id"],
                name=user["name"],
                email=user["email"],
                passwd=hashed,
                role=user["role"],
                getDepartment=department,
            )
            db.session.add(student)
        db.session.commit()

    except Exception as e:
        return jsonify({"message": e}), 200

    return (
        jsonify(
            {
                "message": "Success",
            }
        ),
        201,
    )


@root_route.route("/create_section", methods=["POST"])
def create_section():
    try:
        sections = [
            {
                "id": "26214",
                "semester": "113-1",
                "time": {"一": [6, 7, 8]},
                "max_students": 450,
                "course_id": "CSIE5043",
                "professor_id": "htlin",
            }
        ]
        for section in sections:
            course = Course.query.filter(Course.id == section["course_id"]).first()
            professor = User.query.filter(User.id == section["professor_id"]).first()
            newsection = Section(
                id=section["id"],
                semester=section["semester"],
                time=section["time"],
                max_students=section["max_students"],
                getCourse=course,
                getProfessor=professor,
            )
            db.session.add(newsection)
        db.session.commit()

    except Exception as e:
        return jsonify({"message": e}), 200

    return (
        jsonify(
            {
                "message": "Success",
            }
        ),
        201,
    )
