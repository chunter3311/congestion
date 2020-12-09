# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

# class User(db.Model):
#   __tablename__ = 'users'

#   id = db.Column(db.Integer, primary_key = True)
#   username = db.Column(db.String(40), nullable = False, unique = True)
#   email = db.Column(db.String(255), nullable = False, unique = True)

#   def to_dict(self):
#     return {
#       "id": self.id,
#       "username": self.username,
#       "email": self.email
#     }

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
    # notes = db.relationship('Note', back_populates='user', order_by="Note.updated_at")
    # notebooks = db.relationship('Notebook', back_populates='user')

    # tags = db.relationship('Tag', back_populates="user")


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


# class Note(db.Model):
#     __tablename__ = 'notes'

#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(255), default='Untitled', nullable=True)
#     content = db.Column(db.String, nullable=False)
#     userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     notebookId = db.Column(db.Integer, db.ForeignKey('notebooks.id'))
#     isTrash = db.Column(db.Boolean, default=False)
#     created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
#     updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
#     user = db.relationship('User', back_populates='notes')
#     notebook = db.relationship('Notebook')

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "title": self.title,
#             "content": self.content,
#             "userId": self.userId,
#             "notebookId": self.notebookId,
#             "isTrash": self.isTrash,
#             "created_at": self.created_at,
#             "updated_at": self.updated_at
#         }


# class Notebook(db.Model):
#     __tablename__ = 'notebooks'

#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(255), nullable=False)
#     isDefault = db.Column(db.Boolean, nullable=False)
#     userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
#     updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
#     user = db.relationship('User', back_populates="notebooks")
#     __table_args__ = (db.UniqueConstraint('title', 'userId'), )

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "title": self.title,
#             "isDefault": self.isDefault,
#             "userId": self.userId,
#             "created_at": self.created_at,
#             "updated_at": self.updated_at
#         }


# class Tag(db.Model):
#     __tablename__ = 'tags'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(20), nullable=False)
#     userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
#     updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
#     user = db.relationship('User', back_populates="tags")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "userId": self.userId
#         }


# noteTags = db.Table(
#     'noteTags',
#     db.Model.metadata,
#     db.Column('noteId', db.Integer, db.ForeignKey(
#         'notes.id'), primary_key=True),
#     db.Column('tagId', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
# )
