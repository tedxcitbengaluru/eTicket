import csv
import uuid

uuids = []

for i in range(201):
    id = uuid.uuid4()
    uuids.append(str(id))
    
for j in uuids:
    print(j)

# with open("uuids.csv", "w") as csv_file:

#     writer = csv.writer(csv_file)
#     writer.writerow(theID)