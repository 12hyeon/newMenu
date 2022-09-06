import sys
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

 
# result
print('D011001')
print('D021002')
print('D031003')
print('D051001')