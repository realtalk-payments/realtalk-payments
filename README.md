## Realtalk Payments website

- This is a landing page for realtalk.dev payments service.
- It is a draft and is not ready for production.
- It is built with HTML, CSS, and JavaScript.
- It is hosted by GitHub Pages. at https://realtalk-payments.github.io/realtalk-payments/

# Workspace webfunctions

```js
function doPost(e) {
  try {
    // Parse data from the website
    var data = JSON.parse(e.postData.contents);
    
    var name = data.name || "Not specified";
    var job = data.job || "Not specified";
    var company = data.company || "Not specified";
    var email = data.email || "Not specified";
    var message = data.message || "No message";
    // 1. Where to send email (YOUR EMAIL)
    var recipient = "XXX@XXX.XXX"; // <-- REPLACE WITH YOUR EMAIL
    // 2. Smart Subject Line
    // Example: [RT] Lead: John Doe (Acme Corp)
    var subject = "[RT] Lead: " + name + " (" + company + ")";
    
    // 3. Email Body (English)
    var body = 
      "Name: " + name + "\n" +
      "Job Title: " + job + "\n" +
      "Company: " + company + "\n" +
      "Email: " + email + "\n" +
      "-------------------------\n" +
      "Message:\n" + message;
      
    // 4. Send Email
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: body,
      replyTo: email // Magic: replying to this email goes directly to the client
    });
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```