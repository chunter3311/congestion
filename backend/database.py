from dotenv import load_dotenv

load_dotenv()

from app import app, db
from app.models import User, Pack, Puzzle

with app.app_context():
  db.drop_all()
  db.create_all()

  demo = User(username = 'demo', email = 'demo@demo.com', password='password')
  demo_user_new_pack = Pack(totalPuzzles=1, userId=1)
  demo_user_puzzle = Puzzle(layout=[[0, 0, 0, 1, 1, 1],[0, 0, 0, 2, 0, 0],[3, 4, 4, 2, 5, 6],[3, 7, 7, 7, 5, 6],[3, 0, 8, 9, 5, 6],[0, 0, 8, 9, 10, 10]], difficulty="beginner", solution=[[1, 1], [2, 1]], solutionMoves=2, userId=1, packId=1)
  


  db.session.add(demo)
  db.session.add(demo_user_new_pack)
  db.session.add(demo_user_puzzle)


  db.session.commit()
