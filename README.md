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

#

### ejs tamplate:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <%- include('components/head') %>
</head>
<body>
    <%- include('components/nav') %>

    <%- include('components/footer')%>
</body>
</html>
```