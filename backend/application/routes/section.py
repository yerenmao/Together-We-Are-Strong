from flask import request, jsonify, make_response, Blueprint
from sqlalchemy import func, cast
from sqlalchemy.dialects.postgresql import JSONB
from application.app import db
from application.models import Section
from application.models import Course
from application.models import Department

section_route = Blueprint("section_route", __name__, url_prefix="/api/section")


@section_route.route("/search", methods=["GET"])
def search():
    try:
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
                    Section.id.ilike(f"%{section_id}%"),
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

        DAY_MAPPER = {
            1: "一",  # Monday
            2: "二",  # Tuesday
            3: "三",  # Wednesday
            4: "四",  # Thursday
            5: "五",  # Friday
            6: "六",  # Saturday
        }

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

        # res = [{"name": section.name} for section in query.all()]
        res = []
        for section in query.all():
            course = section.getCourse
            professor = section.getProfessor
            department = course.getDepartment
            res.append(
                {
                    "name": course.name,
                    "professor": professor.name,
                    "semester": section.semester,
                    "department": department.trivial_name,
                    "credits": course.credits,
                    "time": section.time,
                    "classroom": section.classroom,
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
