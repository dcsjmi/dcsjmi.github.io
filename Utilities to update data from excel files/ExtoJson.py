import pandas

excel_data_df = pandas.read_excel('studData.xlsx', sheet_name='Sheet1')

recs = "[\n"
for index, row in excel_data_df.iterrows():
    recs += "\t{\n"
    recs += '\t\t"id": ' + str(row['id']) + ",\n"
    recs += '\t\t"name": ' + '"' + str(row['name']) + '"'  + ",\n"
    recs += '\t\t"email": ' + '"' + str(row['email']) + '"' + ",\n"
    recs += '\t\t"image": ' + '"' + str(row['image']) + '"' + ",\n"
    recs += '\t\t"highQual": ' + '"' + str(row['highQual']) + '"' + ",\n"
    recs += '\t\t"skills": ' + '"' + str(row['skills']) + '"' + ",\n"
    recs += '\t\t"linkedin": ' + '"' + str(row['linkedin']) + '"' + "\n"
    recs += '\t},\n'
recs += "]"

f = open('data.json', 'w')
f.write(recs)
f.close()