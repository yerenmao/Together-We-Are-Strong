from flask import jsonify, Blueprint, request

from application.app import bcrypt
from application.app import db
from application.models import User
from application.models import Department
from application.models import Course
from application.models import Section

create_route = Blueprint("create", __name__, url_prefix="/api/create")

@create_route.route("/bulkuser", methods=["POST"])
def create_student():
    try:
        data = request.get_json()
        for user in data["bulk"]:
            hashed = bcrypt.generate_password_hash(user["passwd"]).decode("utf-8")
            new_user = User(
                id=user["id"],
                name=r'{}'.format(user["name"]),
                email=user["email"],
                passwd=hashed,
                role=user["role"],
                department_id=user["department_id"]
            )
            db.session.add(new_user)
        db.session.commit()
        return jsonify({
            "message": "Success",
            # "name": r'{}'.format(prof["name"]),
            # "passwd": prof["passwd"],
            # "hashed": bcrypt.generate_password_hash(prof["passwd"]).decode("utf-8")
        }), 200
    except Exception as e: 
        return jsonify({"message": e}), 200




@create_route.route("/user", methods=["POST"])
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
                "id": "A12345678",
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


@create_route.route("/section", methods=["POST"])
def create_section():
    try:
        sections = [
            {
                "id": "26214",
                "semester": "113-1",
                "time": {"一": [6, 7, 8]},
                "max_students": 450,
                "course_id": "CSIE5043",
                "professor_id": "A12345678",
            },
            {
                "id": "26215",
                "semester": "113-1",
                "time": {"二": [3, 4], "四": [5, 6]},
                "max_students": 100,
                "course_id": "CSIE1010",
                "professor_id": "A12345678",
            },
            {
                "id": "26216",
                "semester": "113-1",
                "time": {"三": [0, 1, 2]},
                "max_students": 200,
                "course_id": "ECON2021",
                "professor_id": "T22222222",
            },
            {
                "id": "26217",
                "semester": "113-1",
                "time": {"五": [3, 4], "六": [7, 8]},
                "max_students": 60,
                "course_id": "ECON3045",
                "professor_id": "T22222222",
            },
            {
                "id": "26218",
                "semester": "113-1",
                "time": {"四": [2, 3, 4]},
                "max_students": 150,
                "course_id": "ACC3012",
                "professor_id": "P98765432",
            },
            {
                "id": "26219",
                "semester": "113-1",
                "time": {"一": [9, 10], "三": [5, 6]},
                "max_students": 80,
                "course_id": "ACC4018",
                "professor_id": "P98765432",
            },
            {
                "id": "26220",
                "semester": "113-1",
                "time": {"五": [6, 7]},
                "max_students": 100,
                "course_id": "LAW2020",
                "professor_id": "S11111111",
            },
            {
                "id": "26221",
                "semester": "113-1",
                "time": {"二": [3, 4, 5]},
                "max_students": 70,
                "course_id": "LAW3040",
                "professor_id": "S11111111",
            },
            {
                "id": "26222",
                "semester": "113-1",
                "time": {"一": [0, 1], "四": [6, 7]},
                "max_students": 120,
                "course_id": "PSY1011",
                "professor_id": "G77777777",
            },
            {
                "id": "26223",
                "semester": "113-1",
                "time": {"三": [9, 10], "五": [2, 3]},
                "max_students": 90,
                "course_id": "PSY2022",
                "professor_id": "G77777777",
            },
            {
                "id": "26224",
                "semester": "113-1",
                "time": {"六": [5, 6]},
                "max_students": 50,
                "course_id": "IBUS5010",
                "professor_id": "T22222222",
            },
            {
                "id": "26225",
                "semester": "113-1",
                "time": {"一": [8, 9], "三": [10, 11]},
                "max_students": 65,
                "course_id": "IBUS6015",
                "professor_id": "T22222222",
            },
            {
                "id": "26226",
                "semester": "113-1",
                "time": {"五": [0, 1, 2]},
                "max_students": 200,
                "course_id": "EE3020",
                "professor_id": "A12345678",
            },
            {
                "id": "26227",
                "semester": "113-1",
                "time": {"四": [9, 10], "六": [3, 4]},
                "max_students": 75,
                "course_id": "EE4050",
                "professor_id": "G77777777",
            },
            {
                "id": "26228",
                "semester": "113-1",
                "time": {"三": [12, 13, 14]},
                "max_students": 80,
                "course_id": "CSIE1010",
                "professor_id": "A12345678",
            },
        ]
        for section in sections:
            course = Course.query.filter(Course.id == section["course_id"]).first()
            professor = User.query.filter(User.id == section["professor_id"]).first()
            newsection = Section(
                section_id=section["id"],
                semester=section["semester"],
                time=section["time"],
                max_students=section["max_students"],
                getCourse=course,
                getProfessor=professor,
            )
            db.session.add(newsection)
        db.session.commit()

    except Exception as e:
        return jsonify({"message": repr(e)}), 200

    return (
        jsonify(
            {
                "message": "Success",
            }
        ),
        201,
    )
