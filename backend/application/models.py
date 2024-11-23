from flask_login import UserMixin
from datetime import datetime, timezone
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
    type = db.Column(db.Enum("必修", "選修", name="course_type"), nullable=False)

    department_id = db.Column(
        db.String(4), db.ForeignKey("department.id"), nullable=False
    )
    getDepartment = db.relationship("Department", backref="getCourse")

    def __repr__(self):
        return f"<Course: {self.id}, {self.name}, {self.credits}, {self.type}, {self.department_id} />"


class Section(db.Model):
    __tablename__ = "section"
    id = db.Column(db.String(31), primary_key=True)
    semester = db.Column(db.String(15), nullable=False)
    time = db.Column(db.JSON, nullable=False)
    classroom = db.Column(db.String(255))
    max_students = db.Column(db.Integer)

    course_id = db.Column(db.String(31), db.ForeignKey("course.id"), nullable=False)
    getCourse = db.relationship("Course", backref="getSection")
    professor_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getProfessor = db.relationship("User", backref="getSection")


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
    grading_policy = db.Column(db.Text)
    uploaded_at = db.Column(db.DateTime, nullable=False)

    professor_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getProfessor = db.relationship("User", backref="getSyllabus")
    section_id = db.Column(db.String(31), db.ForeignKey("section.id"), nullable=False)
    getSection = db.relationship("Section", backref="getSyllabus")


class SectionOutline(db.Model):
    __tablename__ = "section_outline"
    id = db.Column(db.String(31), primary_key=True, nullable=False)
    week = db.Column(db.String(31), primary_key=True, nullable=False)
    date = db.Column(db.Date, nullable=False)
    lecture_or_event = db.Column(db.Text, nullable=False)

    __table_args__ = (db.PrimaryKeyConstraint("id", "week"),)


class SelectSection(db.Model):
    __tablename__ = "select_section"
    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    section_id = db.Column(db.String(31), db.ForeignKey("section.id"), nullable=False)
    preference_order = db.Column(db.Integer, nullable=False)

    getStudent = db.relationship("User", back_populates="getSelectSection")
    getSection = db.relationship("Section", back_populates="getSelectSection")

    __table_args__ = (db.PrimaryKeyConstraint("student_id", "section_id"),)


class IsTA(db.Model):
    __tablename__ = "is_ta"
    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    section_id = db.Column(db.String(31), db.ForeignKey("section.id"), nullable=False)

    getStudent = db.relationship("User", back_populates="getIsTA")
    getSection = db.relationship("Section", back_populates="getIsTA")

    __table_args__ = (db.PrimaryKeyConstraint("student_id", "section_id"),)


class Group(db.Model):
    __tablename__ = "group"
    id = db.Column(db.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(127), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getStudent = db.relationship("User", back_populates="getGroup")


class JoinGroup(db.Model):
    __tablename__ = "join_group"
    joined_at = db.Column(db.DateTime, nullable=False)

    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getStudent = db.relationship("User", back_populates="getJoinGroup")
    group_id = db.Column(
        db.UUID(as_uuid=True), db.ForeignKey("group.id"), nullable=False
    )
    getGroup = db.relationship("Group", back_populates="getJoinGroup")

    __table_args__ = (db.PrimaryKeyConstraint("student_id", "group_id"),)


class Message(db.Model):
    __tablename__ = "message"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    message = db.Column(db.Text, nullable=False)
    sent_at = db.Column(db.DateTime, nullable=False)

    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getStudent = db.relationship("User", back_populates="getMessage")
    group_id = db.Column(
        db.UUID(as_uuid=True), db.ForeignKey("group.id"), nullable=False
    )
    getGroup = db.relationship("Group", back_populates="getMessage")


class LikeMessage(db.Model):
    __tablename__ = "like_message"
    like = db.Column(db.Boolean, nullable=False)
    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getStudent = db.relationship("User", back_populates="getLikeMessage")
    message_id = db.Column(db.Integer, db.ForeignKey("message.id"), nullable=False)
    getMessage = db.relationship("Message", back_populates="getLikeMessage")

    __table_args__ = (db.PrimaryKeyConstraint("student_id", "message_id"),)


class Event(db.Model):
    __tablename__ = "event"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    proposed_at = db.Column(db.DateTime, nullable=False)

    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getStudent = db.relationship("User", back_populates="getEvent")
    group_id = db.Column(
        db.UUID(as_uuid=True), db.ForeignKey("group.id"), nullable=False
    )
    getGroup = db.relationship("Group", back_populates="getEvent")
    section_id = db.Column(db.String(31), db.ForeignKey("section.id"), nullable=False)
    getSection = db.relationship("Section", back_populates="getEvent")


class ParticipateEvent(db.Model):
    __tablename__ = "participate_event"
    participate = db.Column(db.Boolean, nullable=False)

    student_id = db.Column(db.String(9), db.ForeignKey("user.id"), nullable=False)
    getStudent = db.relationship("User", back_populates="getParticipateEvent")
    section_id = db.Column(db.String(31), db.ForeignKey("section.id"), nullable=False)
    getSection = db.relationship("Section", back_populates="getParticipateEvent")

    __table_args__ = (db.PrimaryKeyConstraint("student_id", "section_id"),)
