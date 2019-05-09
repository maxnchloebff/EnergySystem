from flask import Flask
from flask import render_template, redirect ,url_for,flash
from flask_script import Manager
from flask_wtf import FlaskForm
from flask_sqlalchemy import SQLAlchemy
# from module.module_file import *
import mysql.connector as connector
import numpy as np
import datetime
import time
from wtforms import StringField, SubmitField, PasswordField

"""The global parameters"""
Is_login = False
Current_user = None
oCurrentUser = None
PORT = 6201



app = Flask(__name__)
app.secret_key='nishiwobaba'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:00011122q@127.0.0.1/homedata'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
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
    dataid = db.Column(db.Integer, unique=True)

class Electronics(db.Model):
    #define the table
    __tabelname__ = 'electronics'
    #define ziduan
    #表示是一个字段
    num = db.Column(db.Integer,primary_key=True,unique=True)
    # register_time = db.Column(db.DateTime)
    elec_name = db.Column(db.String(255))
    elec_type = db.Column(db.String(255))
    dataid = db.Column(db.Integer)

class Data(db.Model):
    __tablename__ = 'userdata'
    # foreign key
    num = db.Column(db.Integer,primary_key=True)
    dataid = db.Column(db.Integer)
    ts = db.Column(db.DateTime)
    use_data = db.Column(db.Float)


# class LoginForm(FlaskForm):
#     username = StringField('name')
#     password = PasswordField('Password')
#     submit = SubmitField('Submit')


# manager = Manager(app)
# bootstrap = Bootstrap(app)




"""All the functions we want to achieve"""

@app.route('/addelectronics/<elec_name>/<elec_type>')
def add_elec(elec_name,elec_type):
    global Is_login
    if not Is_login:
        return redirect(url_for('log_in'))
    # print(names)
    new_elec = Electronics(elec_type=elec_type,elec_name=elec_name,dataid=oCurrentUser.dataid)
    db.session.add(new_elec)
    db.session.commit()
    return redirect(url_for('data'))\

@app.route('/deleteelectronics/<elec_name>/<elec_type>')
def delete_elec(elec_name,elec_type):
    global Is_login
    if not Is_login:
        return redirect(url_for('log_in'))
    # print(names)
    wanted_elec = Electronics.query.filter(Electronics.dataid == oCurrentUser.dataid,Electronics.elec_name == elec_name, Electronics.elec_type == elec_type).first()
    db.session.delete(wanted_elec)
    db.session.commit()
    return redirect(url_for('data'))


@app.route('/register/<username>/<password>/<phone>')
def register(username,password,phone):
    new_user = User(name=username,password=password,phone_num=phone)
    db.session.add(new_user)
    db.session.commit()
    return redirect(url_for('log_in'))

@app.route('/loginsuccess/<current_user>')
def return_user(current_user):
    global Current_user,Is_login,oCurrentUser
    Is_login = True
    Current_user = current_user
    oCurrentUser = User.query.filter(User.name == current_user).first()
    print(Current_user)
    return redirect(url_for('data'))

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

"""All the Basic Route to render"""

@app.route('/')
def empty():
    return redirect(url_for('index'))
@app.route('/index')
def index():
    global Is_login
    # print(names)
    a = np.array([1,4,5,8,7,4])
    return render_template('index.html',islogin = Is_login, array = a)

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
    return render_template('html/log_in.html',user_name=user_name,password=password)

@app.route('/contact_us')
def contact_us():
    global Is_login
    if not Is_login:
        return redirect(url_for('log_in'))
    else:
        return render_template('html/contact_us.html',)

@app.route('/alarm')
def alarm():
    global Is_login
    if not Is_login:
        return redirect(url_for('log_in'))
    else:
        Is_alarm = True
        return render_template('html/alarm.html',current_user = Current_user,Is_alarm = Is_alarm)


@app.route('/data')
def data():
    global Is_login,Current_user
    if Is_login == False:
        return redirect(url_for('log_in'))
    else:
        global oCurrentUser
        current_id = oCurrentUser.dataid
        print(current_id)
        result = Electronics.query.filter(Electronics.dataid == 370).all()
        print(result)
        form = []
        for one in result:
            tem = []
            tem.append(one.elec_name)
            tem.append(one.elec_type)
            form.append(tem)

        return render_template('html/data.html',current_user=Current_user,form = form)


@app.route('/graph')
def graph():
    global Is_login
    if not Is_login:
        return redirect(url_for('log_in'))
    else:
        return render_template('html/graph.html',current_user=Current_user)

# prdiction route  oad the keras module and predict the data from real data
# and pass the result_array into prediction.html
@app.route('/prediction')
def prediction():
    global Is_login
    if not Is_login:
        return redirect(url_for('log_in'))
    else:
        result_week = Data.query.filter(Data.dataid == oCurrentUser.dataid,
                                        Data.ts>datetime.datetime(year=2018,month=7,day=10)).limit(10080).all()
        result_month = Data.query.filter(Data.dataid == oCurrentUser.dataid,
                                         Data.ts>datetime.datetime(year=2018,month=7,day=10)).limit(10080*4).all()
        result_season = Data.query.filter(Data.dataid == oCurrentUser.dataid,
                                          Data.ts>datetime.datetime(year=2018,month=7,day=10)).limit(10080*4*3).all()
        data_week = []
        data_month = []
        data_season = []
        timedelta_week = datetime.timedelta(hours=1)
        timedelta_month = datetime.timedelta(hours=4)
        timedelta_season = datetime.timedelta(hours=12)
        selected_week = result_week[0]
        selected_month = result_month[0]
        selected_season = result_season[0]
        for one in result_week:
            # print(time.mktime(one.ts.timetuple()))
            if selected_week.ts+timedelta_week <= one.ts:
                selected_week = one
                tem = []
                tem.append(time.mktime(one.ts.timetuple())*1000)
                tem.append(one.use_data)
                data_week.append(tem)
        for one in result_season:
            # print(time.mktime(one.ts.timetuple()))
            if selected_season.ts+timedelta_season <= one.ts:
                selected_season = one
                tem = []
                tem.append(time.mktime(one.ts.timetuple())*1000)
                tem.append(one.use_data)
                data_season.append(tem)
        for one in result_month:
            # print(time.mktime(one.ts.timetuple()))
            if selected_month.ts+timedelta_month <= one.ts:
                selected_month = one
                tem = []
                tem.append(time.mktime(one.ts.timetuple())*1000)
                tem.append(one.use_data)
                data_month.append(tem)

        return render_template('html/prediction.html', current_user=Current_user,
                               data_season=data_season,data_week=data_week,data_month=data_month)


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
        return render_template('html/usermanagement.html',names = names,current_user=Current_user)


if __name__ == '__main__':
    # app.run(debug=True, port=8000, host='0.0.0.0')

    app.run(port=PORT,debug=True)
