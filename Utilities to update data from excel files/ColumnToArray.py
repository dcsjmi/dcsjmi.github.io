import pandas

file = input("file name without xlsx extension: ")
sheet = input("Sheet Name: ")
column = input("Column Name: ")
excel_data_df = pandas.read_excel(file + '.xlsx', sheet_name=sheet)


recs = "["
for index, row in excel_data_df.iterrows():
    recs += '"' + str(row[column]) + '", '
recs += " ]"


print(recs)
f = open(sheet + '_' +column + '.json', 'w')
f.write(recs)
f.close()