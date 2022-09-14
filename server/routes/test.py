import ast
import numpy as np
import pandas as pd
import sys
from random import *

'''
name = ['userId', 'sex', 'age', 'height', 'weight', 'allergy', 'basal']
'''
name = sys.argv[-1].split(',')
user = dict()
# ex) user['userId'] = user[name[0]]

for i in range(1, 8):
    if (i == 1):
        user[name[i-1]] = sys.argv[i]
    elif (i == 6):
        user[name[i-1]] = [int(x) for x in sys.argv[i].split(',')]
    elif (i == 7):
        user[name[i-1]] = float(sys.argv[i])
    else :
        user[name[i-1]] = int(sys.argv[i])
    #print (user[name[i-1]])

       
allrgy_mapping = {'게':1, '고등어':2, '난류':3, '닭고기':4, '대두(콩)':5, '돼지고기':6, 
                  '땅콩':7, '메밀':8, '밀':9, '새우':10, '쇠고기':11, '아황산류':12, 
                  '어패류(굴, 전복, 홍합 포함)':13, '오징어':14, '우유':15, '잣':16, '토마토':17, '호두':18}


# user = {'userId':'a1', 'sex':'male', 'age':25, 'height':175, 'weight':80, 'allergy':[5, 15], 'basal':2700}


def select_init(df):
    category = df['대분류'].value_counts().index.tolist()
    category_len = len(category) - 1
    index = randint(0, category_len)
    category_select = category[index]
    
    return category_select


def select_food(df, category_list, total_kcal):
    select_food_code = []
    select_food_name = []
    
    for i in range(len(category_list)):
        df_tmp = df[df['대분류'] == category_list[i]]
        if i == 0 or i == 1:
            kcal = total_kcal * 0.3
            df_tmp = df_tmp[df_tmp['에너지(kcal)'] < kcal]
            tmp = len(df_tmp.index.tolist())
            choose = randint(0, tmp - 1)
            select_food_code.append(df_tmp['음식 코드'].iloc[choose])
            select_food_name.append(df_tmp['음식 이름(상세)'].iloc[choose])
        elif i == 2:
            kcal = total_kcal * 0.2
            df_tmp = df_tmp[df_tmp['에너지(kcal)'] < kcal]
            tmp = len(df_tmp.index.tolist())
            choose = randint(0, tmp - 1)
            select_food_code.append(df_tmp['음식 코드'].iloc[choose])
            select_food_name.append(df_tmp['음식 이름(상세)'].iloc[choose])
        elif i == 3:
            kcal = total_kcal * 0.2
            df_tmp = df_tmp[df_tmp['에너지(kcal)'] < kcal]
            tmp = len(df_tmp.index.tolist())
            choose = randint(0, tmp - 1)
            select_food_code.append(df_tmp['음식 코드'].iloc[choose])
            select_food_name.append(df_tmp['음식 이름(상세)'].iloc[choose])
    
    return select_food_code


df = pd.read_csv('C:\\Users\\1212g\\nodejs\\newMenu\\server\\routes\\TEST_kor.csv')
df_filter = df.copy()

user_allrgy_info = user['allergy']
uid = user['userId']
kcal = user['basal']

allrgy_info_tmp = df['알러지 정보(숫자)'].tolist()
allrgy_info = []

for x in allrgy_info_tmp:
    x = ast.literal_eval(x)
    allrgy_info.append(x)

mask_result = []
    
for i in range(len(allrgy_info)):
    mask_tmp = []
    for j in range(len(allrgy_info[i])):
        if allrgy_info[i][j] in user_allrgy_info:
            mask_tmp.append(True)
        else:
            mask_tmp.append(False)
    if True in mask_tmp:
        mask_result.append(True)
    else:
        mask_result.append(False)
        
df_filter['알러지 태그'] = mask_result
df_filter = df_filter[df_filter['알러지 태그'] == False]
df_filter = df_filter.drop(['알러지 태그'], axis=1)

kcal_per = kcal/3
kcal_per

df = df_filter.drop(['알러지 정보', '알러지 정보(숫자)'], axis=1)

df_tag = df['음식 태그'].value_counts().to_frame()
df_tag = df_tag.reset_index()
df_tag = df_tag.sort_values('index')
df_tag = df_tag.set_index('index')
df_tag = df_tag.reset_index()
df_tag = df_tag.iloc[1:]

df_tag_list = df_tag['index'].tolist()

df_1 = df[df['음식 태그'] == 1]
df_2 = df[df['음식 태그'] == 2]
df_3 = df[df['음식 태그'] == 3]
df_4 = df[df['음식 태그'] == 4]
df_5 = df[df['음식 태그'] == 5]

choose = randint(0, 1)
choose_category = []

if choose == 0:
    choose_category.append(select_init(df_1))
    choose_category.append(select_init(df_2))
    choose_category.append(select_init(df_3))
    choose_category.append(select_init(df_5))
elif choose == 1:
    choose_category.append(select_init(df_1))
    choose_category.append(select_init(df_3))
    choose_category.append(select_init(df_4))
    choose_category.append(select_init(df_5))

tmp_list = select_food(df, choose_category, kcal_per)

for elem in tmp_list:
    print(elem)