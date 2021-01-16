from dotenv import load_dotenv

load_dotenv()

from app import app, db
from app.models import User, Pack, Puzzle

with app.app_context():
  db.drop_all()
  db.create_all()

  demo = User(username = 'demo', email = 'demo@demo.com', password='password')
  demo_user_new_pack = Pack(totalPuzzles=1, userId=1)
  demo_user_puzzle = Puzzle(layout="010101020304050000020304050000060604500000707070000008000000000080909", difficulty="beginner", userId=1, packId=1)
  


  db.session.add(demo)
  db.session.add(demo_user_new_pack)
  db.session.add(demo_user_puzzle)


  db.session.commit()
