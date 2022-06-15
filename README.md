# E-Fair

### Description :
A website where farm food sellers can list their products and users can choose between them by comparing where to buy from. It will also greatly save time for buyers, since they do not have to physically be in the market. The seller and the buyer agree on their own. We do not deliver yet (because now it is not profitable).  Seller need to pay for the account every month or week (if you have not paid, then the account is frozen (thus inactive sellers will not be displayed))

---

### Resources and tools used:
- [Visual Studio Code (code editor)](https://code.visualstudio.com)
- [WebStorm (IDE)](https://www.jetbrains.com/ru-ru/webstorm/)
- [Gitkraken (Git GUI)](https://www.gitkraken.com/)

---

### Useful links:
- [Node.js (official site)](https://nodejs.org/en/)
- [Node Package Manager](https://www.npmjs.com)
- [Express (Node.js framework)](https://expressjs.com/ru/)
- [MongoDB (Database)](https://www.mongodb.com)
- [EJS (Embedded JavaScript templates)](https://www.npmjs.com/package/ejs)
- [Cloudinaty (Platform where you can upload img and videos after get access them)](https://cloudinary.com/)

#

### ejs template:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <%- include('components/head') %>
</head>
<body>
    <%- include('components/nav' )%>

    <%- include('components/footer')%>
</body>
</html>
```
---
#How to run
### Dependencies:
```
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.0",
    "cloudinary": "^1.29.1",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.0.0",
    "ejs": "^3.1.6",
    "express": "^4.17.3",
    "express-session": "^1.17.3",
    "express-validator": "^6.14.0",
    "formidable": "^2.0.1",
    "google-auth-library": "^8.0.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.3.0",
    "multer": "^1.4.4",
    "passport": "^0.6.0",
    "passport-google-oauth2": "^0.2.0",
    "razorpay": "^2.8.1"
```
###To run it locally you need to write in cmd :
```
npm run start
```

#Account for testing
####ADMIN - username:admin,  password:adminadmin123
####USER - username:USERTesting,  password:USERUSERUSER
