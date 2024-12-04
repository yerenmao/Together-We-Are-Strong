from flask_login import UserMixin
from sqlalchemy.dialects.postgresql import JSONB
import uuid

from application.app import db


class User(db.Model, UserMixin):
    __tablename__ = "user"
    id = db.Column(db.String(9), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    passwd = db.Column(db.String, nullable=True)
    role = db.Column(db.Enum("admin", "student", "prof", name="role"), nullable=False)

    department_id = db.Column(
        db.String(4), db.ForeignKey("department.id"), nullable=False
    )
    getDepartment = db.relationship("Department", backref="getUser")

    def __repr__(self):
        return f"<User: {self.id}, {self.name}, {self.email}, {self.passwd}, {self.role}, {self.department_id} />"

    def get_id(self):
        return self.id


class Department(db.Model):
    __tablename__ = "department"
    id = db.Column(db.String(4), fixed_length=True, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    trivial_name = db.Column(db.String(127))

    def __repr__(self):
        return f"<Department: {self.id}, {self.name}, {self.trivial_name} />"


class Course(db.Model):
    __tablename__ = "course"
    id = db.Column(db.String(31), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    credits = db.Column(db.Integer, nullable=False)
    type = db.Column(
        db.Enum("必修", "選修", "必帶", name="course_type"), nullable=False
    )

    department_id = db.Column(
        db.String(4), db.ForeignKey("department.id"), nullable=False
    )
    getDepartment = db.relationship("Department", backref="getCourse")

    def __repr__(self):
        return f"<Course: {self.id}, {self.name}, {self.credits}, {self.type}, {self.department_id} />"


class Section(db.Model):
    __tablename__ = "section"
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    section_id = db.Column(db.String(31), nullable=False)
    semester = db.Column(db.String(15), nullable=False)
    time = db.Column(JSONB, nullable=False)
    classroom = db.Column(db.String(255))
    max_students = db.Column(db.Integer)

    course_id = db.Column(db.String(31), db.ForeignKey("course.id"), nullable=False)
    getCourse = db.relationship("Course", backref="getSection")
    professor_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getProfessor = db.relationship("User", backref="getSection")

    def __repr__(self):
        return f"<Section: {self.id}, {self.semester}, {self.time}, {self.classroom}, {self.max_students}, {self.course_id}, {self.professor_id} />"


class Syllabus(db.Model):
    __tablename__ = "syllabus"
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    overview = db.Column(db.Text)
    objective = db.Column(db.Text)
    requirement = db.Column(db.Text)
    expected_weekly_study_hours = db.Column(db.Text)
    office_hours = db.Column(db.Text)
    textbook = db.Column(db.Text)
    reference = db.Column(db.Text)

    professor_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getProfessor = db.relationship("User", backref="getSyllabus")
    section_id = db.Column(db.BigInteger, db.ForeignKey("section.id"), nullable=False)
    getSection = db.relationship("Section", backref="getSyllabus")

    def __repr__(self):
        return f"<Syllabus: {self.id}, {self.overview}, {self.objective}, {self.requirement}, {self.expected_weekly_study_hours}, {self.office_hours}, {self.textbook}, {self.reference}, {self.professor_id}, {self.section_id} />"


class SectionOutline(db.Model):
    __tablename__ = "section_outline"
    id = db.Column(db.String(31), primary_key=True, nullable=False)
    week = db.Column(db.String(31), primary_key=True, nullable=False)
    date = db.Column(db.Date, nullable=False)
    lecture_or_event = db.Column(db.Text, nullable=False)

    __table_args__ = (db.PrimaryKeyConstraint("id", "week"),)

    def __repr__(self):
        return f"<SectionOutline: {self.id}, {self.week}, {self.date}, {self.lecture_or_event} />"


class SelectSection(db.Model):
    __tablename__ = "select_section"
    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    section_id = db.Column(db.BigInteger, db.ForeignKey("section.id"), nullable=False)
    preference_order = db.Column(db.Integer, nullable=False)

    getStudent = db.relationship("User")  # , backref="getSelectSection")
    getSection = db.relationship("Section")  # , backref="getSelectSection")

    __table_args__ = (db.PrimaryKeyConstraint("student_id", "section_id"),)

    def __repr__(self):
        return f"<SelectSection: {self.student_id}, {self.section_id}, {self.preference_order} />"


class IsTA(db.Model):
    __tablename__ = "is_ta"
    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    section_id = db.Column(db.BigInteger, db.ForeignKey("section.id"), nullable=False)

    getStudent = db.relationship("User", backref="getIsTA")
    getSection = db.relationship("Section", backref="getIsTA")

    __table_args__ = (db.PrimaryKeyConstraint("student_id", "section_id"),)


class Group(db.Model):
    __tablename__ = "group"
    id = db.Column(db.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(127), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getStudent = db.relationship("User", backref="getGroup")

    def __repr__(self):
        return (
            f"<Group: {self.id}, {self.name}, {self.created_at}, {self.student_id} />"
        )


class JoinGroup(db.Model):
    __tablename__ = "join_group"
    joined_at = db.Column(db.DateTime, nullable=False)

    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getStudent = db.relationship("User", backref="getJoinGroup")
    group_id = db.Column(
        db.UUID(as_uuid=True), db.ForeignKey("group.id"), nullable=False
    )
    getGroup = db.relationship("Group", backref="getJoinGroup")

    __table_args__ = (db.PrimaryKeyConstraint("student_id", "group_id"),)

    def __repr__(self):
        return f"<JoinGroup: {self.student_id}, {self.group_id}, {self.joined_at} />"


class Message(db.Model):
    __tablename__ = "message"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    message = db.Column(db.Text, nullable=False)
    sent_at = db.Column(db.DateTime, nullable=False)

    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getStudent = db.relationship("User", backref="getMessage")
    group_id = db.Column(
        db.UUID(as_uuid=True), db.ForeignKey("group.id"), nullable=False
    )
    getGroup = db.relationship("Group", backref="getMessage")

    def __repr__(self):
        return f"<Message: {self.id}, {self.message}, {self.student_id}, {self.group_id}, {self.sent_at} />"


class LikeMessage(db.Model):
    __tablename__ = "like_message"
    like = db.Column(db.Boolean, nullable=False)
    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getStudent = db.relationship("User", backref="getLikeMessage")
    message_id = db.Column(db.Integer, db.ForeignKey("message.id"), nullable=False)
    getMessage = db.relationship("Message", backref="getLikeMessage")

    __table_args__ = (db.PrimaryKeyConstraint("student_id", "message_id"),)


class Event(db.Model):
    __tablename__ = "event"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    proposed_at = db.Column(db.DateTime, nullable=False)

    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getStudent = db.relationship("User", backref="getEvent")
    group_id = db.Column(
        db.UUID(as_uuid=True), db.ForeignKey("group.id"), nullable=False
    )
    getGroup = db.relationship("Group", backref="getEvent")
    section_id = db.Column(db.BigInteger, db.ForeignKey("section.id"), nullable=False)
    getSection = db.relationship("Section", backref="getEvent")


class ParticipateEvent(db.Model):
    __tablename__ = "participate_event"
    participate = db.Column(db.Boolean, nullable=False)

    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getStudent = db.relationship("User", backref="getParticipateEvent")
    section_id = db.Column(db.BigInteger, db.ForeignKey("section.id"), nullable=False)
    getSection = db.relationship("Section", backref="getParticipateEvent")

    __table_args__ = (db.PrimaryKeyConstraint("student_id", "section_id"),)
