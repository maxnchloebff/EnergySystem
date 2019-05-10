import time
import datetime
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression


data = pd.read_csv("test.csv", delimiter=',')
# print(data)
data_value = data.values
data_converted = np.array(data_value)
day_size = 365
test_size = 61
X_train = data_converted[0:day_size-test_size, 1:1441]
X_train = X_train.astype(float)
# print(X_train)
X_test = data_converted[day_size-test_size:day_size, 1:1441]
X_test = X_test.astype(float)
# print(X_test)
Y_train = data_converted[0:day_size-test_size, 1441]
Y_train = Y_train.astype(float)
# print(Y_train)
Y_test = data_converted[day_size-test_size:day_size, 1441]
Y_test = Y_test.astype(float)
# print(Y_test)

clf = LogisticRegression()
clf.fit(X_train, Y_train)

Y_predict = clf.predict(X_test)
proba = clf.predict_proba(X_test)
# print(proba)

result = [[]]
for i in range(test_size):
    tem = []
    convert = datetime.datetime.strptime(data_converted[day_size - test_size + i, 0], '%Y/%m/%d')
    # print(convert)
    tem.append(convert)
    risk_rate = abs((proba[i, 0] * proba[i, 0] - proba[i, 1] * proba[i, 1]) / 2)
    # print(risk_rate)
    tem.append(risk_rate)
    result.append(tem)
print(result)

