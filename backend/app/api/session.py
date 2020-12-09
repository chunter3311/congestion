from flask import Blueprint, request, make_response
from sqlalchemy import or_
from flask_login import login_user, current_user, logout_user
from app.auth import login_manager
from app.models import User
from app.forms import LoginForm
from werkzeug.datastructures import MultiDict
from flask_wtf.csrf import generate_csrf


session = Blueprint("session", __name__)

@session.route("/login", methods=["POST"])
def login():
    data = MultiDict(mapping=request.json)
    print('data!:', data)
    form = LoginForm(data)
    print(form.data)
    if form.validate():
        user = User.query.filter(or_(User.username == data['email_or_username'], User.email == data['email_or_username'])).first()
        if user and user.check_password(data['password']):
            login_user(user)
            return {"user": { "user_id": user.to_dict()['id'] } }
        else:
            res = make_response({ "errors": ["Invalid credentials"] }, 401)
            return res
    else:
        res = make_response({ "errors": [ form.errors[error][0] for error in form.errors ]}, 401)
        return res


@session.route('/logout', methods=["DELETE"])
def logout():
    logout_user()
    return { "message": "User successfully logged out" }


@session.route("/csrf", methods=["GET"])
def csrf():
    res = make_response("Setting csrf token")
    res.set_cookie("XSRF-TOKEN", generate_csrf())
    return res

@session.route('/load', methods=["GET"])
def load():
    print(current_user)
    if current_user.is_authenticated:
        return {"user": { "user_id": current_user.to_dict()['id']}}
    else:
        return {"user": {"user_id": ""}}

@login_manager.user_loader
def load_user(user_id):
    if user_id is not None:
        return User.query.get(user_id)
    return None
