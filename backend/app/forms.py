from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, IntegerField
from wtforms.validators import InputRequired, Length, Email


class LoginForm(FlaskForm):
    email_or_username = StringField("Email", validators=[InputRequired("please provide a valid email or username.")])
    password = PasswordField("Password", validators=[InputRequired("please provide a valid password.")])

class SignUpForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired("please provide a valid username.")])
    email = StringField("Email", validators=[InputRequired("please provide a valid email."), Email("please provide a valid email.")])
    password = PasswordField("Password", validators=[InputRequired("please provide a valid password.")])

class PackForm(FlaskForm):
    totalPuzzles = IntegerField("totalPuzzles")
    isShared = BooleanField("isShared")
    userId = IntegerField("UserId")

# class PuzzleForm(FlaskForm):
#     difficulty = StringField("Difficulty", validators=[InputRequired("Puzzle difficulty must be at least one character long")])
#     solutionMoves = IntegerField("SolutionMoves")
#     totalStars = IntegerField("TotalStars")
#     totalPlays = IntegerField("TotalPlays")
#     packId = IntegerField("PackId")
#     userId = IntegerField("UserId")