from flask import Blueprint, request
from app.models import db, Puzzle, Pack
from datetime import datetime

puzzles = Blueprint("puzzles", __name__)

@puzzles.route("/", methods=["POST"])
def new_puzzle():
    data = request.json
    puzzle = Puzzle(layout=data['layout'], difficulty=data['difficulty'], solution=data['solution'], solutionMoves=data['solutionMoves'], totalStars=data['totalStars'], totalPlays=data['totalPlays'], userId=data['userId'], packId=data['packId'])
    db.session.add(puzzle)
    db.session.commit()
    return puzzle.to_dict()

@puzzles.route("/<int:puzzle_id>", methods=["PUT"])
def update_puzzle(puzzle_id):
    data = request.json
    puzzle = Puzzle.query.filter(Puzzle.id == puzzle_id).first()
    puzzle.layout = data['layout']
    puzzle.difficulty = data['difficulty']
    puzzle.solution = data["solution"]
    puzzle.solutionMoves = data["solutionMoves"]
    puzzle.totalStars = data["totalStars"]
    puzzle.totalPlays = data["totalPlays"]
    db.session.commit()
    return puzzle.to_dict()


@puzzles.route("/", methods=['PUT'])
def delete_puzzle():
    data = request.json
    puzzle = Puzzle.query.filter(Puzzle.id == data).first()
    if not puzzle.isTrash:
        puzzle.isTrash = True
        puzzle.packId = None
        db.session.commit()
    return {'message': 'Puzzle is trash'}


@puzzles.route('/', methods=['DELETE'])
def empty_trash():
    data = request.json
    for puzzleId in data:
        puzzle = Puzzle.query.filter(Puzzle.id == puzzleId).first()
        db.session.delete(puzzle)
    db.session.commit()
    return {'message': 'Trash taken out'}


@puzzles.route('/<int:puzzle_id>/move_to/<int:pack_id>', methods=['PUT'])
def move_puzzle(puzzle_id, pack_id):
    puzzle = Puzzle.query.get(puzzle_id)
    puzzle.packId = pack_id
    db.session.commit()
    return puzzle.to_dict()
