from dotenv import load_dotenv

load_dotenv()

from app import app, db
from app.models import User, Pack, Puzzle

with app.app_context():
  db.drop_all()
  db.create_all()

  demo_user = User(username = 'demo', email = 'demo@demo.com', password='password')
  demo_user_pack1 = Pack(totalPuzzles=5, userId=1)
  demo_user_puzzle1 = Puzzle(layout="010101020304050000020304050000060604500000707070000008000000000080909", difficulty="beginner", userId=1, packId=1)
  demo_user_puzzle2 = Puzzle(layout="010101020304050000020304050000060604500000707070000008000000000080909", difficulty="beginner", userId=1, packId=1)
  demo_user_puzzle3 = Puzzle(layout="010101020304050000020304050000060604500000707070000008000000000080909", difficulty="intermediate", userId=1, packId=1)
  demo_user_puzzle4 = Puzzle(layout="010101020304050000020304050000060604500000707070000008000000000080909", difficulty="experienced", userId=1, packId=1)
  demo_user_puzzle5 = Puzzle(layout="010101020304050000020304050000060604500000707070000008000000000080909", difficulty="master", userId=1, packId=1)

  demo_user_pack2 = Pack(totalPuzzles=0, userId=1)
  demo_user_pack3 = Pack(totalPuzzles=0, userId=1)
  demo_user_pack4 = Pack(totalPuzzles=0, userId=1)
  demo_user_pack5 = Pack(totalPuzzles=0, userId=1)

  db.session.add(demo_user)
  db.session.add(demo_user_pack1)
  db.session.add(demo_user_puzzle1)
  db.session.add(demo_user_puzzle2)
  db.session.add(demo_user_puzzle3)
  db.session.add(demo_user_puzzle4)
  db.session.add(demo_user_puzzle5)
  db.session.add(demo_user_pack2)
  db.session.add(demo_user_pack3)
  db.session.add(demo_user_pack4)
  db.session.add(demo_user_pack5)


  db.session.commit()
