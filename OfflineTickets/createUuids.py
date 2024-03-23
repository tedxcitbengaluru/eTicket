import csv
import uuid

# Use this only once. Once generated, PLEASE FOR THE LOVE OF GOD DO NOT RUN THIS CODE AGAIN.
# ALWAYS PUSH TO GITHUB. KEEP RECORD OF THE UUIDS
uuids = []

for i in range(201):
    id = uuid.uuid4()
    uuids.append(str(id))
    
with open("OfflineTickets/uuids.csv", "w", newline="") as csv_file:
    writer = csv.writer(csv_file)
    writer.writerows([[uuid] for uuid in uuids])