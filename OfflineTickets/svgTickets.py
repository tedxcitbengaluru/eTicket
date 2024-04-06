import requests
import base64
import csv

from cairosvg import svg2png

uuids = []
# uuidFileLocation = r"D:\CS\QR\OfflineTickets"
with open("uuids.csv", "r", newline="") as uuid_file:
    reader = csv.reader(uuid_file)
    for row in reader:
        uuids.append(row)


for i in range (len(uuids)):
    #Making QR code for specific uuid using google API:
    qrlink = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={data}"
    qrlink = qrlink.replace("{data}", uuids[i][1]); #uuid array to be made

    #converting the said qr to base64 string to send it to the .svg file:
    response = requests.get(qrlink)
    base64_qrstring = base64.b64encode(response.content).decode('utf-8')

    ticketNumber = uuids[i][0]
    
    ticketFileName = "Ticket_"+ticketNumber+".svg"
    templateTicket = "templateTicket.svg" #location of template ticket

    #Reading template .svg file "templateTicket.svg" to replace data
    with open(templateTicket, "r") as ticTemplate:
        #encoded_string = base64.b64encode(img_file.read())
        mySVG = ticTemplate.read()
        #sending the ticket number and the qr image to the svg file
        # DO NOT FUCK WITH THE NEXT TWO LINES. Made it work somehow.
        mySVG = mySVG.replace("{{TicketNumber}}", "TRNO: " + ticketNumber)
        mySVG = mySVG.replace("{{QR_IMAGE}}", base64_qrstring)
        print("Base Ticket Recieved")

    svg2png(byte_string=mySVG, write_to="product/"+ticketNumber+".png")
    
    # destinationPath = r"product/"
    
    # #writing to new ticket file
    # with open(destinationPath+ticketFileName, "w") as targetTicket:
    #     targetTicket.write(mySVG)
    #     print("Ticket", ticketNumber, "generated!")
