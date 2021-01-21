from dotenv import load_dotenv

load_dotenv()

from app import app, db
from app.models import User, Pack, Puzzle

with app.app_context():
  db.drop_all()
  db.create_all()

  demo_user = User(username = 'demo', email = 'demo@demo.com', password='password')
  demo_user_pack1 = Pack(totalPuzzles=3, userId=1)
  demo_user_puzzle1 = Puzzle(layout="000101020300000000020300000004040300050505000000000607070808000609091010", difficulty="beginner", userId=1, packId=1)
  demo_user_puzzle2 = Puzzle(layout="010000000000010202030000040405030607080805090607001011090612001011131312", difficulty="intermediate", userId=1, packId=1)
  demo_user_puzzle3 = Puzzle(layout="010202030404010000030500010606070500080809070500000009101011121213130011", difficulty="experienced", userId=1, packId=1)
  demo_user_pack2 = Pack(userId=1)
  demo_user_pack3 = Pack(userId=1)
  demo_user_pack4 = Pack(userId=1)
  demo_user_pack5 = Pack(userId=1)
  demo_user_pack6 = Pack(userId=1)
  demo_user_pack7 = Pack(userId=1)

  db.session.add(demo_user)
  db.session.add(demo_user_pack1)
  db.session.add(demo_user_puzzle1)
  db.session.add(demo_user_puzzle2)
  db.session.add(demo_user_puzzle3)
  db.session.add(demo_user_pack2)
  db.session.add(demo_user_pack3)
  db.session.add(demo_user_pack4)
  db.session.add(demo_user_pack5)
  db.session.add(demo_user_pack6)
  db.session.add(demo_user_pack7)


  db.session.commit()
