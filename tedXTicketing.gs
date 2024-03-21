//.Appscript File:
//Change Range Values and Input string data according to the requirements.
//Using google APIs to generate QR Codes
//Generate TicketIDs only once

function sendEmail() {
    //Be on the desired sheet:
    var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (!ss) {
        Logger.log("Sheet 'Emails' Not found!"); //Change name
    }
    var lr = ss.getLastRow();
    // var templateBody = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template").getRange(1, 1).getValue();

    var templateBody =
        "Hello {name},\nGreetings from TEDxCITBengaluru!\nThis is a confirmation mail of your ticket booking for our event on {date}.\n\tYour transcation ID done is {transaction ID}.\n\n{image}\n\nPlease show this QR code at the time of entering our event.\n Thank you,\n Naresh\n TEDXCITBengaluru\n";

    for (var i = 2; i <= lr; i++) {
        var currentName = ss.getRange(i, 3).getValue();
        var currentEmail = ss.getRange(i, 2).getValue();
        var currentTranscationId = ss.getRange(i, 11).getValue();
        var currentTicketId = ss.getRange(i, 13).getValue();

        Logger.log(currentName);
        Logger.log(currentEmail);
        Logger.log(currentTranscationId);
        Logger.log(currentTicketId);

        var qrImageFormula = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${currentTicketId}`;

        var subject = `Ticket Confirmation for your TEDxCITBengaluru Event!`;

        var qrImageHtml = '<img src="' + qrImageFormula + '"alt="QR Code">';
        var messageBody = templateBody
            .replace("{name}", currentName)
            .replace("{date}", "TBD")
            .replace("{transaction ID}", currentTranscationId)
            .replace("{image}", qrImageHtml);

        var isVerified = ss.getRange(i, 15).getValue();
        Logger.log(isVerified);

        //Send only if "VERIFIED" and change to "TICKET MAIL SENT"
        if (isVerified === "VERIFIED") {
            try {
                // Attach the QR image to the email
                MailApp.sendEmail({
                    to: currentEmail,
                    subject: subject,
                    htmlBody: messageBody,
                });

                ss.getRange(i, 15).setValue("TICKET MAIL SENT");

                Logger.log("Email sent to: " + currentEmail);
            } catch (e) {
                Logger.log("Error sending email: " + e.toString());
            }
        }
    }
}

function generateTicketIDs() {
    var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var lr = ss.getLastRow();
    for (var i = 2; i <= 201; i++) {
        var ticket = ticketId(i);
        ss.getRange(i, 13).setValue(ticket);
        Logger.log(ticket);
    }
}

function ticketId(i) {
    var orgName = "TEDxCIT";
    var year = "2024";
    var eventName = "AETH";
    // eventName = eventName.slice(4);
    year = year.slice(-2);
    var index = i < 11 ? `00${i - 1}` : i < 101 ? `0${i - 1}` : `${i - 1}`;

    var id = orgName + year + "_" + eventName + "_" + index;
    return id;
}

//Function not needed as qr generated in mail directly. Do not use this unless you want to waste your time:
function generateQR() {
    var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (!ss) {
        Logger.log("Sheet 'Emails' not found!");
        return;
    }

    var lr = ss.getLastRow();

    for (var i = 2; i <= lr; i++) {
        var targetCell = ss.getRange(i, 14).getValue();
        // var currentTranscationId = ss.getRange(i, 4).getValue();

        var qrCell = ss.getRange(i, 18);
        if (qrCell.getValue() === "") {
            var encodedData = encodeURIComponent(targetCell);
            var qrLink = `=IMAGE("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedData}")`;

            var qrCell = ss.getRange(i, 18); // Column G
            qrCell.setFormula(qrLink);
        }
    }
}

function getQRImageUrlFromFormula(formula) {
    var imageUrl = formula.match(/"([^"]+)"/)[1];
    return imageUrl;
}

// function onOpen(e)
// {
//   SpreadsheetApp.getUi().createMenu("TEDX Ticket Magic").addItem("Generate QR", "Send E-mails").addToUi()
// }
