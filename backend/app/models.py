from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
    puzzles = db.relationship('Puzzle', back_populates='user', order_by="Puzzle.updated_at")
    packs = db.relationship('Pack', back_populates='user')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }


class Puzzle(db.Model):
    __tablename__ = 'puzzles'

    id = db.Column(db.Integer, primary_key=True)
    difficulty = db.Column(db.String, nullable=True)
    layout = db.Column(db.String, nullable=False)
    solution = db.Column(db.String, default="unsolved", nullable=False)
    solutionMoves = db.Column(db.Integer, default=-1, nullable=False)
    totalStars = db.Column(db.Integer, default=0, nullable=False)
    totalPlays = db.Column(db.Integer, default=0, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    packId = db.Column(db.Integer, db.ForeignKey('packs.id'))
    isTrash = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
    user = db.relationship('User', back_populates='puzzles')
    pack = db.relationship('Pack')

    def to_dict(self):
        return {
            "id": self.id,
            "difficulty": self.difficulty,
            "layout": self.layout,
            "solution": self.solution,
            "solutionMoves": self.solutionMoves,
            "totalStars": self.totalStars,
            "totalPlays": self.totalPlays,
            "userId": self.userId,
            "packId": self.packId,
            "isTrash": self.isTrash,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }


class Pack(db.Model):
    __tablename__ = 'packs'

    id = db.Column(db.Integer, primary_key=True)
    totalPuzzles = db.Column(db.Integer, default=0, nullable=False)
    isShared = db.Column(db.Boolean, default=False, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
    user = db.relationship('User', back_populates="packs")

    def to_dict(self):
        return {
            "id": self.id,
            "totalPuzzles": self.totalPuzzles,
            "isShared": self.isShared,
            "userId": self.userId,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
