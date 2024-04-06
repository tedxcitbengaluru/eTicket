function sendEmail() {
    //Be on the desired sheet:
    var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (!ss) {
        Logger.log("Sheet 'Main Sheet' Not found!"); //Change name
    }
    var lr = ss.getLastRow();

    const htmlFile = HtmlService.createHtmlOutputFromFile("ticket.html").getContent()

    for (var i = 2; i <= lr; i++) {
       try {
        var currentName = ss.getRange(i, 1).getValue();
        var currentEmail = ss.getRange(i, 2).getValue();
        var currentTicketNumber = ss.getRange(i, 8).getValue();
        var currentTicketId = ss.getRange(i, 9).getValue();

        var subject = `Your TEDxCITBengaluru "Aether" Event Confirmation!`;

        var messageBody = htmlFile
          .replace("{{Name}}", currentName)
          .replace("{{Name}}", currentName)
          .replace("{{QR_DATA}}", currentTicketId)
          .replace("{{QR_DATA}}", currentTicketId)
          .replace("{{TRNO}}", currentTicketNumber)

        var isVerified = ss.getRange(i, 7).getValue();

        //Send only if "VERIFIED" and change to "TICKET MAIL SENT"
        if (isVerified === "VERIFIED") {
           
                MailApp.sendEmail({
                    to: currentEmail,
                    subject: subject,
                    htmlBody: messageBody,
                });

                ss.getRange(i, 7).setValue("TICKET MAIL SENT");

                Logger.log("Email sent to: " + currentEmail);
        }
      } catch (e) {
            Logger.log("Error: " + e.toString());
        }
    }
}

function onOpen(e)
{
  SpreadsheetApp.getUi().createMenu("Ticket Actions").addItem("sendEmail","sendEmail").addItem("Refresh Offline Tickets", "refreshOfflineTickets").addToUi()
}