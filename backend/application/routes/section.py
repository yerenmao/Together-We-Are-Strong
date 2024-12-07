from flask import request, jsonify, make_response, Blueprint
from flask_login import current_user

from application.app import db
from application.models import Section, Course, Department, IsTA

section_route = Blueprint("section_route", __name__, url_prefix="/api/section")

DAY_MAPPER = {
    1: "一",  # Monday
    2: "二",  # Tuesday
    3: "三",  # Wednesday
    4: "四",  # Thursday
    5: "五",  # Friday
    6: "六",  # Saturday
}

def studentSearch():
    data = request.args.to_dict()
    course_name = data["course_name"]
    section_id = data["section_id"]
    department_name = data["department_name"]
    dayOptions = [day for day in range(1, 7) if data[f"check-{day}"] == "true"]
    timeOptions = [
        time - 1 for time in range(1, 16) if data[f"check-class{time}"] == "true"
    ]
    
    query = Section.query.join(Course, Section.course_id == Course.id).join(
        Department, Course.department_id == Department.id
    )
    if course_name != "":
        query = query.filter(Course.name.ilike(f"%{course_name}%"))
    if section_id != "":
        query = query.filter(
            db.or_(
                Section.section_id.ilike(f"%{section_id}%"),
                Course.id.ilike(f"%{section_id}%"),
            )
        )
    if department_name != "":
        query = query.filter(
            db.or_(
                Department.trivial_name.ilike(f"%{department_name}%"),
                Department.name.ilike(f"%{department_name}%"),
            )
        )

    if dayOptions or timeOptions:
        if timeOptions:
            if not dayOptions:
                dayOptions = [1, 2, 3, 4, 5, 6]
            filters = []
            for day in dayOptions:
                for time in timeOptions:
                    filters.append(
                        db.and_(
                            Section.time.has_key(DAY_MAPPER[day]),
                            Section.time[DAY_MAPPER[day]].contains(
                                db.literal([time])
                            ),
                        )
                    )
            query = query.filter(db.or_(*filters))
        else:
            day_filters = []
            for day in dayOptions:
                day_filters.append(Section.time.has_key(DAY_MAPPER[day]))
            query = query.filter(db.or_(*day_filters))

    return query


@section_route.route("/search", methods=["GET"])
def search():
    try:
        if current_user.role == "student":
            sections = studentSearch().all()
        elif current_user.role == "prof":
            sections = current_user.getSection
        elif current_user.role == "admin":
            query = Section.query.join(Course, Section.course_id == Course.id)
            sections = query.filter(Course.department_id == current_user.department_id).all()
            sections.sort(key=lambda sec: sec.semester, reverse=True)

        res = []
        for section in sections:
            course = section.getCourse
            professor = section.getProfessor
            department = course.getDepartment
            TAs = [ista.getStudent.name for ista in IsTA.query.filter(IsTA.section_id == section.id).all()]
            res.append(
                {
                    "id": section.id,
                    "name": course.name,
                    "professor": professor.name,
                    "semester": section.semester,
                    "department": department.trivial_name,
                    "credits": course.credits,
                    "time": section.time,
                    "classroom": section.classroom,
                    "TAs": TAs
                }
            )
        return (
            jsonify(
                {
                    "message": "Success",
                    "sections": res,
                }
            ),
            201,
        )

    except Exception as e:
        return make_response(jsonify({"error": repr(e)}), 200)


@section_route.route("/check", methods=["GET"])
def check():
    try:
        data = request.args.to_dict()
        semester = data["semester"]
        section_id = data["section"]

        query = Section.query.join(Course, Section.course_id == Course.id)
        
        query = query.filter(db.or_(
                    Section.section_id.ilike(f"%{section_id}%"),
                    Course.id.ilike(f"%{section_id}%"),
                ))
        
        query = query.filter(Section.semester == semester)

        # for section in :
        #     course = section.getCourse
        #     res.append({"name": course.name})

        return jsonify({
            "message": "Success",
            "courseName": query.first().getCourse.name
        }), 200

    except Exception as e:
        return make_response(jsonify({"error": repr(e)}), 200)
    

@section_route.route("/getname/<id>", methods=["GET"])
def getName(id):
    try:
        section = Section.query.filter(Section.id == int(id)).first()
        return jsonify({
            "message": "Success",
            "name": section.getCourse.name,
            "semester": section.semester
        }), 200
    except Exception as e:
        return make_response(jsonify({"error": repr(e)}), 200)

    
@section_route.route("/ta", methods=["POST"])
def addTa():
    try:
        data = request.get_json()
        section_id, student_id = data["sectionid"], data["taId"]
        res = IsTA.query.filter(db.and_(IsTA.section_id == section_id, IsTA.student_id == student_id)).all()
        if len(res) == 0:
            ista = IsTA(student_id=student_id,section_id=section_id)
            db.session.add(ista)
            db.session.commit()
            return jsonify({
                "message": "Success",
            }), 200
        else:
            return jsonify({
                "message": "Already Exist",
            }), 200
    except Exception as e:
        return make_response(jsonify({"error": repr(e)}), 200)