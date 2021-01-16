from flask import Blueprint, request
from app.models import db, Pack
from datetime import datetime

packs = Blueprint("packs", __name__)

@packs.route("/", methods=["POST"])
def new_pack():
    data = request.json
    pack = Pack(userId=data['userId'], totalPuzzles=data['totalPuzzles'], isShared=data['isShared'])
    db.session.add(pack)
    db.session.commit()
    return pack.to_dict()

@packs.route("/<int:pack_id>", methods=["PUT"])
def edit_pack(pack_id):
    data = request.json
    pack = Pack.query.get(pack_id)
    pack.totalPuzzles = data['totalPuzzles']
    pack.isShared = data['isShared']
    pack.updated_at = datetime.now()
    db.session.commit()
    return pack.to_dict()

@packs.route("/<int:pack_id>/update", methods=["PUT"])
def update_pack(pack_id):
    pack = Pack.query.get(pack_id)
    pack.updated_at = datetime.now()
    db.session.commit()
    return pack.to_dict()

@packs.route("/<int:pack_id>", methods=["DELETE"])
def delete_pack(pack_id):
    puzzles = Puzzle.query.filter(Puzzle.packId == pack_id).all()
    for puzzle in puzzles:
        if not puzzle.isTrash or puzzle.packId is not None:
            puzzle.isTrash = True
            puzzle.packId = null()
            db.session.commit()
    pack = Pack.query.get(pack_id)
    db.session.delete(pack)
    db.session.commit()
    res = make_response({ "message": "pack successfully deleted" }, 200)
    return res

@packs.route("/<int:pack_id>")
def get_pack():
    pack = Pack.query
    db.session.add(pack)
    db.session.commit()
    return pack.to_dict()