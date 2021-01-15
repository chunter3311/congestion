from flask import Blueprint, jsonify, request, make_response
from app.models import db, User, Pack, Puzzle
from app.forms import SignUpForm
from werkzeug.datastructures import MultiDict

user_routes = Blueprint('users', __name__)

@user_routes.route('/', methods=["GET"])
def index():
  response = User.query.all()
  return { "users": [user.to_dict() for user in response]}

@user_routes.route('/', methods=["POST"])
def new():
  data = MultiDict(mapping=request.json)
  print(data)
  form = SignUpForm(data)
  print(form.data)
  if form.validate():
    if User.query.filter(User.email == data["email"]).first() is None:
      newUser = User(username = data["username"], email = data["email"], password = data["password"] )
      db.session.add(newUser)
      db.session.commit()

      user_dict = newUser.to_dict()
      return { user_dict["id"]: user_dict }
    else:
      res = make_response({ "errors": ["A user with that email already exists"] }, 401)
      return res
  else:
    errorset = set()
    for error in form.errors:
      errorset.add(form.errors[error][0])
    errorlist = list(errorset)
    res = make_response({ "errors": errorlist}, 401)
    return res

@user_routes.route('/<int:user_id>')
def get_user_info(user_id):
  user = User.query.get(user_id)
  return user.to_dict()

@user_routes.route('/<int:user_id>/puzzles', methods=["GET"])
def get_user_puzzles(user_id):
  puzzles = [puzzle.to_dict() for puzzle in User.query.filter(User.id == user_id).first().puzzles]
  puzzle_dict = dict()
  for puzzle in puzzles:
      puzzle_dict[puzzle["id"]] = puzzle
  return puzzle_dict

@user_routes.route('/<int:user_id>/packs', methods=["GET"])
def get_user_packs(user_id):
  packs = Pack.query.filter(Pack.userId == user_id).all()
  pack_dict = dict()
  for pack in packs:
    pack_dict[pack.to_dict()["id"]] = pack.to_dict()
  return pack_dict


@user_routes.route("/<int:user_id>/trash", methods=['DELETE'])
def delete_user_trash(user_id):
  Puzzle.query.filter(Puzzle.isTrash == True and Puzzle.userId == user_id).delete()
  db.session.commit()

@user_routes.route("/<int:user_id>/trash", methods=["GET"])
def get_user_trash(user_id):
  trash_puzzles = [puzzle.to_dict()["id"] for puzzle in Puzzle.query.filter(Puzzle.isTrash == True, Puzzle.userId == user_id).all()]
  return { "trash": trash_puzzles }
