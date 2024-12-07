from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from os import environ
import time

db = SQLAlchemy()


def createdb(tries=100):
    tried, done = 0, False
    while tried < tries and not done:
        try:
            db.create_all()
            done = True
        except:
            time.sleep(1)
            tried += 1
    if not done:
        raise Exception("Database connection error")


def create_app():
    global bcrypt

    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DATABASE_URL")
    CORS(app, supports_credentials=True)  # Enable CORS for all routes
    db.init_app(app)

    app.secret_key = "123"
    # app.config['REMEMBER_COOKIE_REFRESH_EACH_REQUEST'] = True
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = "login"

    from application.models import User

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(id)

    bcrypt = Bcrypt(app)

    from application.routes.root import root_route

    app.register_blueprint(root_route)

    # from application.routes.users import users_route

    # app.register_blueprint(users_route)

    from application.routes.student import student_route

    app.register_blueprint(student_route)

    from application.routes.create import create_route

    app.register_blueprint(create_route)

    from application.routes.section import section_route

    app.register_blueprint(section_route)

    from application.routes.group import group_route

    app.register_blueprint(group_route)

    from application.routes.message import message_route

    app.register_blueprint(message_route)

    from application.routes.event import event_route

    app.register_blueprint(event_route)

    from application.routes.course import course_route

    app.register_blueprint(course_route)

    app.app_context().push()
    createdb()
    return app
