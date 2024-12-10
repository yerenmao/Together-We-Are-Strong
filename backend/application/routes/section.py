from flask import request, jsonify, make_response, Blueprint
from flask_login import current_user

from application.app import db
from application.models import (
    Section,
    SelectSection,
    Course,
    Department,
    IsTA,
    User,
    Syllabus,
)

section_route = Blueprint("section_route", __name__, url_prefix="/api/section")

DAY_MAPPER = {
    1: "一",  # Monday
    2: "二",  # Tuesday
    3: "三",  # Wednesday
    4: "四",  # Thursday
    5: "五",  # Friday
    6: "六",  # Saturday
}


@section_route.route("/<sectionid>", methods=["GET"])
def syllabus(sectionid):
    try:
        syllabus = Syllabus.query.filter(Syllabus.section_id == sectionid).first()
        TAs = [
            {"id": ista.getStudent.id, "name": ista.getStudent.name}
            for ista in IsTA.query.filter(IsTA.section_id == sectionid).all()
        ]
        return (
            jsonify(
                {
                    "message": "Success",
                    "TAs": TAs,
                    "overview": syllabus.overview,
                    "objective": syllabus.objective,
                    "requirement": syllabus.requirement,
                    "expectedWeeklyStudyHours": syllabus.expected_weekly_study_hours,
                    "officeHours": syllabus.office_hours,
                    "textbook": syllabus.textbook,
                    "reference": syllabus.reference,
                    "semester": syllabus.getSection.semester,
                    "professor": syllabus.getSection.getProfessor.name,
                    "courseName": syllabus.getSection.getCourse.name,
                }
            ),
            200,
        )
    except Exception as e:
        return make_response(jsonify({"error": repr(e)}), 200)


def studentSearch():
    data = request.args.to_dict()
    semester = data["semester"]
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
    if semester == "":
        semester = "113-1"
    query = query.filter(Section.semester == semester)
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
                            Section.time[DAY_MAPPER[day]].contains(db.literal([time])),
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
            sections = query.filter(
                Course.department_id == current_user.department_id
            ).all()
            sections.sort(key=lambda sec: sec.semester, reverse=True)

        res = []
        for section in sections:
            course = section.getCourse
            professor = section.getProfessor
            department = course.getDepartment
            TAs = [
                {"id": ista.getStudent.id, "name": ista.getStudent.name}
                for ista in IsTA.query.filter(IsTA.section_id == section.id).all()
            ]
            res.append(
                {
                    "id": section.id,
                    "section_id": section.section_id,
                    "course_id": course.id,
                    "name": course.name,
                    "professor": professor.name,
                    "semester": section.semester,
                    "department": department.trivial_name,
                    "credits": course.credits,
                    "time": section.time,
                    "classroom": section.classroom,
                    "TAs": TAs,
                    "cur_students": len(
                        SelectSection.query.filter(
                            SelectSection.section_id == section.id
                        ).all()
                    ),
                    "max_students": section.max_students,
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


@section_route.route("/search/<semester>", methods=["GET"])
def search_semester(semester):
    try:
        if current_user.role == "prof":
            query = Section.query.filter(
                db.and_(
                    Section.professor_id == current_user.id,
                    Section.semester == semester,
                )
            )
        elif current_user.role == "admin":
            query = Section.query.join(Course, Section.course_id == Course.id)
            query = query.filter(
                db.and_(
                    Course.department_id == current_user.department_id,
                    Section.semester == semester,
                )
            )
        sections = query.all()
        res = []
        for section in sections:
            course = section.getCourse
            professor = section.getProfessor
            department = course.getDepartment
            TAs = [
                {"id": ista.getStudent.id, "name": ista.getStudent.name}
                for ista in IsTA.query.filter(IsTA.section_id == section.id).all()
            ]
            res.append(
                {
                    "id": section.id,
                    "section_id": section.section_id,
                    "course_id": course.id,
                    "name": course.name,
                    "professor": professor.name,
                    "semester": section.semester,
                    "department": department.trivial_name,
                    "credits": course.credits,
                    "type": course.type,
                    "time": section.time,
                    "classroom": section.classroom,
                    "TAs": TAs,
                    "cur_students": len(
                        SelectSection.query.filter(
                            SelectSection.section_id == section.id
                        ).all()
                    ),
                    "max_students": section.max_students,
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

        query = query.filter(
            db.or_(
                Section.section_id.ilike(f"%{section_id}%"),
                Course.id.ilike(f"%{section_id}%"),
            )
        )

        query = query.filter(Section.semester == semester)

        # for section in :
        #     course = section.getCourse
        #     res.append({"name": course.name})

        return (
            jsonify({"message": "Success", "courseName": query.first().getCourse.name}),
            200,
        )

    except Exception as e:
        return make_response(jsonify({"error": repr(e)}), 200)


@section_route.route("/getname/<id>", methods=["GET"])
def getName(id):
    try:
        section = Section.query.filter(Section.id == int(id)).first()
        return (
            jsonify(
                {
                    "message": "Success",
                    "name": section.getCourse.name,
                    "semester": section.semester,
                }
            ),
            200,
        )
    except Exception as e:
        return make_response(jsonify({"error": repr(e)}), 200)


@section_route.route("/ta", methods=["POST"])
def addTa():
    try:
        data = request.get_json()
        section_id, student_id = data["sectionid"], data["taId"]
        res = IsTA.query.filter(
            db.and_(IsTA.section_id == section_id, IsTA.student_id == student_id)
        ).all()
        if len(res) == 0:
            ista = IsTA(student_id=student_id, section_id=section_id)
            db.session.add(ista)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Success",
                    }
                ),
                200,
            )
        else:
            return (
                jsonify(
                    {
                        "message": "Already Exist",
                    }
                ),
                200,
            )
    except Exception as e:
        return make_response(jsonify({"error": repr(e)}), 200)


@section_route.route("/ta/delete", methods=["POST"])
def removeTa():
    try:
        data = request.get_json()
        section_id, name = data["section_id"], data["name"]
        query = IsTA.query.join(User, IsTA.student_id == User.id)
        ta = query.filter(
            db.and_(IsTA.section_id == section_id, User.name == name)
        ).first()
        db.session.delete(ta)
        db.session.commit()
        return (
            jsonify({"message": "Success"}),
            200,
        )
    except Exception as e:
        return make_response(jsonify({"error": repr(e)}), 200)


def time_overlap(time1, time2):
    for day, time in time1.items():
        if day in time2:
            if bool(set(time) & set(time2[day])):
                return True
    return False


@section_route.route("/schedule", methods=["POST"])
def schedule():
    try:
        data = request.get_json()
        student_id, section_id = current_user.id, data["section_id"]
        section = Section.query.filter(Section.id == section_id).first()
        selected = SelectSection.query.filter(
            SelectSection.section_id == section_id
        ).all()
        if len(selected) == section.max_students:
            raise Exception("Overflow")
        selected_sections = SelectSection.query.filter(
            SelectSection.student_id == student_id
        ).all()
        for sec in selected_sections:
            if time_overlap(sec.getSection.time, section.time):
                raise Exception("Overlap")
        new_select = SelectSection(student_id=student_id, section_id=section_id)
        db.session.add(new_select)
        db.session.commit()
        return (
            jsonify({"message": "Success", "section": repr(new_select)}),
            200,
        )
    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 200)


@section_route.route("/schedule/delete", methods=["POST"])
def delete_schedule():
    try:
        data = request.get_json()
        student_id, section_id = current_user.id, data["id"]

        delete_section = SelectSection.query.filter(
            db.and_(
                SelectSection.student_id == student_id,
                SelectSection.section_id == section_id,
            )
        ).first()
        db.session.delete(delete_section)
        db.session.commit()
        return (
            jsonify({"message": "Success"}),
            200,
        )
    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 200)


@section_route.route("/schedule/<userid>", methods=["GET"])
def getSchedule(userid):
    try:
        student = User.query.filter(User.id == userid).first()
        selected_sections = SelectSection.query.filter(
            SelectSection.student_id == userid
        ).all()
        res = []
        for selected_section in selected_sections:
            section = selected_section.getSection
            res.append(
                {
                    "section_id": section.id,
                    "section_type": section.getCourse.type,
                    "section_name": section.getCourse.name,
                    "section_prof": section.getProfessor.name,
                    "time": section.time,
                }
            )
        return (
            jsonify(
                {
                    "message": "Success",
                    "sections": res,
                    "name": student.name,
                    "is_self": userid == current_user.id,
                }
            ),
            200,
        )
    except Exception as e:
        return make_response(jsonify({"error": repr(e)}), 200)


@section_route.route("/create", methods=["POST"])
def create():
    try:
        data = request.get_json()
        courseId, professorId, sectionId, semester, time, classroom, maxStudents = (
            data["courseId"],
            data["professorId"],
            data["sectionId"],
            data["semester"],
            data["time"],
            data["classroom"],
            data["maxStudents"],
        )

        section = Section(
            section_id=sectionId,
            semester=semester,
            time=time,
            classroom="未公佈" if classroom == "" else classroom,
            max_students=120 if maxStudents == "" else int(maxStudents),
            course_id=courseId,
            professor_id=professorId,
        )
        db.session.add(section)
        db.session.commit()
        return (
            jsonify({"message": "Success"}),
            200,
        )
    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 200)
