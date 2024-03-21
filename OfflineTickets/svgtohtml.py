import requests
import base64

# uuids to be made - 200 unique codes in this array - later to be converted to .csv to be exported into the main spreadsheet
uuid = ["e130cff4-7c5a-4886-bdba-175efd71ef9c", "9babfa2d-0dde-41c8-82bb-f401815d1822", "549a707d-42b5-4c80-a30a-33a97ceea1a3"]

for i in range (1, 4):
    #Making QR code for specific uuid using google API:
    qrlink = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={data}"
    qrlink = qrlink.replace("{data}", uuid[i - 1]); #uuid array to be made

    #converting the said qr to base64 string to send it to the .svg file:
    response = requests.get(qrlink)
    base64_qrstring = base64.b64encode(response.content).decode('utf-8')
    ticketNumber = ""
    if i <= 9:
        ticketNumber = "00" + str(i)
    elif i <= 99:
        ticketNumber = "0"+str(i)
    else:
        ticketNumber = str(i) #ticket number here (001 to 200)
    
    ticketFileName = "Ticket_"+ticketNumber+".svg"
    templateTicket = "D:\CS\QR\OfflineTickets\\templateTicket.svg" #location

    #Reading template .svg file "templateTicket.svg" to replace data
    with open(templateTicket, "r") as ticTemplate:
        #encoded_string = base64.b64encode(img_file.read())
        mySVG = ticTemplate.read()
        #sending the ticket number and the qr image to the svg file
        mySVG = mySVG.replace("{{TicketNumber}}", ticketNumber)
        mySVG = mySVG.replace("{{QR_IMAGE}}", base64_qrstring)
        print("Base Ticket Recieved")
    
    destinationPath = "D:\CS\QR\OfflineTickets\product\\"
    with open(destinationPath+ticketFileName, "w") as targetTicket:
        targetTicket.write(mySVG)
        print("Ticket", i, "generated!")
