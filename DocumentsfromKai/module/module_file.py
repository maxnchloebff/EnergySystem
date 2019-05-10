from app import *
class User(db.Model):
    #define the table
    __tabelname__ = 'users'
    #define ziduan
    #表示是一个字段
    id = db.Column(db.Integer,primary_key=True)
    # register_time = db.Column(db.DateTime)
    password = db.Column(db.String(255))
    phone_num = db.Column(db.String(255),unique=True)
    name = db.Column(db.String(255),unique=True)

class Data(db.Model):
    __tablename__ = 'data'
    # foreign key
    number = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.Integer,db.ForeignKey('user.name'))
    time = db.Column(db.DateTime)
    user = db.relationship('User')

class LoginForm(FlaskForm):
    username = StringField('name')
    password = PasswordField('Password')
    submit = SubmitField('Submit')