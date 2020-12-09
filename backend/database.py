from dotenv import load_dotenv

load_dotenv()

from app import app, db
# from app.models import User, Notebook, Note
from app.models import User

with app.app_context():
  db.drop_all()
  db.create_all()

  demo = User(username = 'demo', email = 'demo@demo.com', password='password')
  # demo_user_default_notebook = Notebook(title='My Notebook', isDefault=True, userId=1)
  # demo_user_new_notebook = Notebook(title='Novels', isDefault=False, userId=1)
  # demo_user_note = Note(title='The Two Towers', content="'There is some good in this world, and it's worth fighting for.' - Samwise Gamgee", userId=1, notebookId=2)
  # demo_user_note_2 = Note(title='A Tale of Two Cities', content='"It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair." — Charles Dickens', userId=1, notebookId=2)
  # demo_user_new_notebook2 = Notebook(title='TV Shows', isDefault=False, userId=1)
  # demo_user_note_3 = Note(title="Breaking Bad", content="'I am the one who knocks.' — Walter White", userId=1, notebookId=None, isTrash=True)
  # demo_user_note_4 = Note(title="The Wire", content="'You come at the king, you best not miss.' — Omar Little", userId=1, notebookId=None, isTrash=True)
  # demo_user_new_notebook3 = Notebook(title='Movies', isDefault=False, userId=1)
  # demo_user_note_5 = Note(title="Finding Nemo", content='"Just keep swimming" - Dory', userId=1, notebookId=None, isTrash=True)
  # demo_user_note_6 = Note(title="The Godfather", content="I'm going to make him an offer he can't refuse. - The Godfather", userId=1, notebookId=None, isTrash=True)




  db.session.add(demo)
  # db.session.add(demo_user_default_notebook)
  # db.session.add(demo_user_new_notebook)
  # db.session.add(demo_user_new_notebook2)
  # db.session.add(demo_user_new_notebook3)
  # db.session.add(demo_user_note)
  # db.session.add(demo_user_note_2)
  # db.session.add(demo_user_note_3)
  # db.session.add(demo_user_note_4)
  # db.session.add(demo_user_note_5)
  # db.session.add(demo_user_note_6)


  db.session.commit()
