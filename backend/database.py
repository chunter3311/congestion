from dotenv import load_dotenv

load_dotenv()

from app import app, db
from app.models import User, Pack, Puzzle

with app.app_context():
  db.drop_all()
  db.create_all()

  demo = User(username = 'demo', email = 'demo@demo.com', password='password')
  demo_user_new_pack = Pack(totalPuzzles=2, userId=1)
  demo_user_puzzle = Puzzle(layout="010101020304050000020304050000060604500000707070000008000000000080909", difficulty="beginner", userId=1, packId=1)
  demo_user_puzzle1 = Puzzle(layout="010101020304050000020304050000060604500000707070000008000000000080909", difficulty="beginner", userId=1, packId=1)
  
  demo_user_new_pack1 = Pack(totalPuzzles=1, userId=1)
  demo_user_puzzle2 = Puzzle(layout="010101020304050000020304050000060604500000707070000008000000000080909", difficulty="beginner", userId=1, packId=2)
  
  demo_user_new_pack3 = Pack(totalPuzzles=0, userId=1)
  demo_user_new_pack4 = Pack(totalPuzzles=0, userId=1)
  demo_user_new_pack5 = Pack(totalPuzzles=0, userId=1)
  demo_user_new_pack6 = Pack(totalPuzzles=0, userId=1)
  demo_user_new_pack7 = Pack(totalPuzzles=0, userId=1)
  demo_user_new_pack8 = Pack(totalPuzzles=0, userId=1)
  demo_user_new_pack9 = Pack(totalPuzzles=0, userId=1)
  demo_user_new_pack10 = Pack(totalPuzzles=0, userId=1)
  demo_user_new_pack11 = Pack(totalPuzzles=0, userId=1)
  demo_user_new_pack12 = Pack(totalPuzzles=0, userId=1)
  demo_user_new_pack2 = Pack(totalPuzzles=0, userId=1)


  db.session.add(demo)
  db.session.add(demo_user_new_pack)
  db.session.add(demo_user_puzzle)
  db.session.add(demo_user_puzzle1)
  db.session.add(demo_user_puzzle2)
  db.session.add(demo_user_new_pack1)
  db.session.add(demo_user_new_pack2)
  db.session.add(demo_user_new_pack3)
  db.session.add(demo_user_new_pack4)
  db.session.add(demo_user_new_pack5)
  db.session.add(demo_user_new_pack6)
  db.session.add(demo_user_new_pack7)
  db.session.add(demo_user_new_pack8)
  db.session.add(demo_user_new_pack9)
  db.session.add(demo_user_new_pack10)
  db.session.add(demo_user_new_pack11)
  db.session.add(demo_user_new_pack12)


  db.session.commit()
