import csv
import uuid

uuids = []

for i in range(201):
    id = uuid.uuid4()
    uuids.append(str(id))
    
with open("uuids.csv", "w", newline="") as csv_file:
    writer = csv.writer(csv_file)
    writer.writerows([[uuid] for uuid in uuids])