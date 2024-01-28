const passport = require('passport');
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'team.dripinfinite@gmail.com', // gmail
    pass: process.env.MAIL_PASSWORD, // pass
  },
});


exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt');
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};


exports.sendMail = async function ({to, subject, text, html}){
    let info = await transporter.sendMail({
        from: '"DRIPINFINITE" <team.dripinfinite@gmail.com>', // sender address
        to,
        subject,
        text,
        html
      });
    return info;  
}

exports.invoiceTemplate = function(order){

 return (`<!DOCTYPE html>
 <html lang="en">
 <head>
   <meta charset="utf-8">
   <meta http-equiv="x-ua-compatible" content="ie=edge">
   <title>Email Receipt</title>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <style type="text/css">
     @media screen {
       @font-face {
         font-family: 'Source Sans Pro';
         font-style: normal;
         font-weight: 400;
         src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
       }
 
       @font-face {
         font-family: 'Source Sans Pro';
         font-style: normal;
         font-weight: 700;
         src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
       }
     }
 
     body {
       width: 100% !important;
       height: 100% !important;
       padding: 0 !important;
       margin: 0 !important;
       background-color: #f7f7f7;
     }
 
     table {
       border-collapse: collapse !important;
       width: 100% !important;
     }
 
     img {
       max-width: 100%;
       height: auto;
       line-height: 100%;
       text-decoration: none;
       border: 0;
       outline: none;
       display: block;
       margin: 0 auto;
     }
 
     a {
       color: #3366cc;
       text-decoration: none;
     }
 
     .preheader {
       display: none;
       max-width: 0;
       max-height: 0;
       overflow: hidden;
       font-size: 1px;
       line-height: 1px;
       color: #fff;
       opacity: 0;
     }
 
     /* Header */
     .header {
       background-color: #2c3e50;
       padding: 20px;
     }
 
     .header img {
       max-width: 100px;
     }
 
     .hero {
       padding: 36px 24px 0;
       font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
       border-top: 3px solid #d4dadf;
       background-color: #ffffff;
     }
 
     .hero h1 {
       margin: 0;
       font-size: 32px;
       font-weight: 700;
       letter-spacing: -1px;
       line-height: 48px;
       color: #333333;
     }
 
     /* Content Block */
     .content {
       padding: 24px;
       font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
       font-size: 16px;
       line-height: 24px;
       background-color: #ffffff;
     }
 
     .content p {
       margin: 0;
       color: #666666;
     }
 
     /* Receipt Table */
     .receipt-table {
       padding: 24px;
       font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
       font-size: 16px;
       line-height: 24px;
       background-color: #ffffff;
     }
 
     .receipt-table strong {
       font-weight: bold;
     }
 
     .receipt-table table {
       width: 100%;
     }
 
     .receipt-table td {
       padding: 12px;
       border-top: 2px dashed #D2C7BA;
       border-bottom: 2px dashed #D2C7BA;
     }
 
     /* Receipt Address Block */
     .receipt-address {
       font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
       font-size: 16px;
       line-height: 24px;
       background-color: #ffffff;
       border-bottom: 3px solid #d4dadf;
     }
 
     .receipt-address p {
       margin: 0;
     }
 
     /* Footer */
     .footer {
       padding: 24px;
       font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
       font-size: 14px;
       line-height: 20px;
       color: white;
       background-color: #2c3e50;
     }
   </style>
 </head>
 <body>
 
   <div class="preheader">
     A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
   </div>
 
   <!-- Header -->
   <div class="header" style="text-align: center; background-color: #2c3e50; padding: 20px;">
     <a href="https://dripinfinite.vercel.app/" target="_blank">
     <span style="color:#fffff; font-weight:400;">DRIPINFINITE</span>
      //  <img src="\logo4.png" alt="DRIPINFINITE" style="max-width: 100px;">
     </a>
   </div>
 
   <!-- Hero -->
   <div class="hero">
     <h1>Thank you for your order!</h1>
   </div>
 
   <!-- Content Block -->
   <div class="content">
     <p>Here is a summary of your recent order. If you have any questions or concerns about your order, please <a href="mailto:team.dripinfinite@gmail.com">contact us</a>.</p>
   </div>
 
   <!-- Receipt Table -->
   <div class="receipt-table">
     <table>
       <tr>
         <td width="60%"><strong>Order #</strong></td>
         <td width="20%">Item Quantity</td>
         <td width="20%"><strong>${order.id}</strong></td>
       </tr>
       ${order.items.map(item => `
         <tr>
           <td width="60%">${item.product.title}</td>
           <td width="20%">${item.quantity}</td>
           <td width="20%">₹${Math.round(item.product.price * (1 - item.product.discountPercentage / 100), 2)}</td>
         </tr>
       `)}
       <tr>
         <td width="60%" style="border-top: 2px dashed #D2C7BA; border-bottom: 2px dashed #D2C7BA;"><strong>Total</strong></td>
         <td width="20%" style="border-top: 2px dashed #D2C7BA; border-bottom: 2px dashed #D2C7BA;"><strong>${order.totalItems}</strong></td>
         <td width="20%" style="border-top: 2px dashed #D2C7BA; border-bottom: 2px dashed #D2C7BA;"><strong>₹${order.totalAmount}</strong></td>
       </tr>
     </table>
   </div>
 
   <!-- Receipt Address Block -->
   <div class="receipt-address" style="border-bottom: 3px solid #d4dadf;">
     <div style="display: inline-block; width: 100%; max-width: 50%; min-width: 240px; vertical-align: top;">
       <table>
         <tr>
           <td style="padding-bottom: 36px; padding-left: 10px;">
             <p><strong>Delivery Address</strong></p>
             <p>${order.selectedAddress.name}<br>${order.selectedAddress.street}<br>${order.selectedAddress.city},${order.selectedAddress.state},${order.selectedAddress.pinCode}</p>
             <p>${order.selectedAddress.phone}</p>
           </td>
         </tr>
       </table>
     </div>
   </div>
 
   <!-- Footer -->
   <div class="footer">
     <p>You received this email because we received a request for order from your account. <br> If you didn't request the order, you can <a href="mailto:team.dripinfinite@gmail.com">contact us</a>!</p>
   </div>
 
 </body>
 </html>`
 )


}