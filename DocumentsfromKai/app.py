from flask import Flask
from flask import render_template, redirect ,url_for
from flask_sqlalchemy import SQLAlchemy
# from module.module_file import *
# con
"""The global parameters"""
Is_login = False
Current_user = None



# from flask_bootstrap import Bootstrap
import mysql.connector as connector
app = Flask(__name__)
app.secret_key='nishiwobaba'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:00011122q@127.0.0.1/homedata'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
# manager = Manager(app)
# bootstrap = Bootstrap(app)

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
#
# class LoginForm(FlaskForm):
#     username = StringField('name')
#     password = PasswordField('Password')
#     submit = SubmitField('Submit')


@app.route('/index')
def index():
    global Is_login
    # print(names)
    return render_template('index.html', islogin = Is_login)
@app.route('/register/<username>/<password>/<phone>')
def register(username,password,phone):
    new_user = User(name=username,password=password,phone_num=phone)
    db.session.add(new_user)
    db.session.commit()
    return redirect(url_for('log_in'))

@app.route('/return/<current_user>')
def return_user(current_user):
    global Current_user
    Current_user = current_user
    print(Current_user)
    return None

@app.route('/log_in')
def log_in():
    conn = connector.connect(user='root', password='00011122q', db='bigdata', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT name,password FROM user"
    cur.execute("use homedata")
    cur.execute(sql)
    one = cur.fetchone()
    user_name = []
    password = []
    while one is not None:
        user_name.append(one[0])
        password.append(one[1])
        one = cur.fetchone()
    conn.close()
    # print(password,user_name)
    return render_template('html/log_in.html', user_name=user_name, password=password)

@app.route('/contact_us')
def contact_us():
    global Is_login
    if not Is_login:
        return redirect(url_for('log_in'))
    else:
        return render_template('html/contact_us.html')


@app.route('/data')
def data():
    global Is_login
    if Is_login == False:
        Is_login = True
        return render_template('html/data.html')
    else:
        return render_template('html/data.html')


@app.route('/graph')
def graph():
    global Is_login
    if not Is_login:
        return redirect(url_for('log_in'))
    else:
        return render_template('html/graph.html')


@app.route('/prediction')
def prediction():
    global Is_login
    if not Is_login:
        return redirect(url_for('log_in'))
    else:
        return render_template('html/prediction.html')

@app.route('/delete_user/<user_name>')
def delete_user(user_name):
    certain_user = User.query.filter(User.name == user_name).first()
    if certain_user:
        try:
            db.session.delete(certain_user)
            db.session.commit()
        except Exception as e:
            print(e)
            print("There is something wrong")
            db.session.rollback()
    else:
        print('There is no such user')

    return redirect(url_for('usermanagement'))

@app.route('/add_user/<user_name>/<password>/<phone_num>')
def add_user(user_name,password,phone_num):
    new_user = User(name=user_name,phone_num=phone_num,password=password)
    db.session.add(new_user)
    db.session.commit()
    return redirect(url_for('data'))

@app.route('/usermanagement')
def usermanagement():
    global Is_login
    if not Is_login:
        return redirect(url_for('log_in'))
    else:
        conn = connector.connect(user='root', password='00011122q', db='bigdata', charset='utf8')
        cur = conn.cursor()
        sql = "SELECT name FROM user"
        cur.execute("use homedata")
        cur.execute(sql)
        names = cur.fetchall()
        conn.close()
        # print(names)
        return render_template('html/usermanagement.html', names = names)


if __name__ == '__main__':
    # app.run(debug=True, port=8000, host='0.0.0.0')

    app.run(port=7453,debug=True)
