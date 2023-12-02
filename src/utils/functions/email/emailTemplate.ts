export function generateEmailTemplate({ body }) {
  return `<!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title></title>
     </head>
     <body style="background: #00212b; height: 100%; margin: 0; padding: 0">
       <table
         cellpadding="0"
         cellspacing="0"
         width="100%"
         style="
           background: #00212b;
           border-collapse: collapse;
           mso-table-lspace: 0pt;
           mso-table-rspace: 0pt;
         "
       >
         <tr>
           <td align="center" valign="top" style="padding: 20px">
             <table
               cellpadding="0"
               cellspacing="0"
               width="100%"
               style="
                 max-width: 600px;
                 background: #00212b;
                 border: 1px solid #b89e4f;
                 margin: 0 auto;
               "
             >
               <tr>
                 <td align="center" valign="top">
                   <table
                     cellpadding="0"
                     cellspacing="0"
                     width="100%"
                     style="border-collapse: collapse"
                   >
                     <tr>
                       <td align="center" valign="top" style="padding: 10px">
                         <img
                           src="https://lexolent.appbites.dev/email-icons/lexolent.png"
                           alt="lexolent"
                           style="
                             display: block;
                             max-width: 100%;
                             margin-top: 25px;
                           "
                         />
                       </td>
                       <td align="center" valign="top" style="padding: 10px">
                         <img
                           src="https://lexolent.appbites.dev/email-icons/arrow.png"
                           alt="lexolent"
                           style="
                             display: block;
                             max-width: 100%;
                             visibility: hidden;
                           "
                         />
                       </td>
                     </tr>
                   </table>
                   <table
                     cellpadding="0"
                     cellspacing="0"
                     width="100%"
                     style="border-collapse: collapse"
                   >
                     <tr>
                       <td
                         align="left"
                         valign="top"
                         style="padding: 20px 30px; color: white"
                       >
                         ${body}
                       </td>
                     </tr>
                   </table>
   
                   <table
                     cellpadding="0"
                     cellspacing="0"
                     width="100%"
                     style="border-collapse: collapse"
                   >
                     <tr>
                       <td>
                         <hr
                           style="
                             border: 1px solid #b89e4f;
                             margin: 0px 30px 30px 30px;
                           "
                         />
                       </td>
                     </tr>
                   </table>
   
                   <table
                     cellpadding="0"
                     cellspacing="0"
                     width="100%"
                     style="border-collapse: collapse"
                   >
                     <tr>
                       <td
                         align="center"
                         valign="top"
                         style="padding: 10px 10px 0px 10px"
                       >
                         <img
                           src="https://lexolent.appbites.dev/email-icons/lexolent.png"
                           alt="lexolent"
                           style="display: block; max-width: 100%"
                         />
                       </td>
                     </tr>
                     <tr>
                       <td align="center" valign="top" style="padding: 10px">
                         <p
                           style="
                             font-weight: 400;
                             font-size: 14px;
                             line-height: 22px;
                             color: white;
                             margin: 10px 0;
                           "
                         >
                           Lexolent Team
                         </p>
                         <p
                           style="
                             font-weight: 400;
                             font-size: 14px;
                             line-height: 22px;
                             color: white;
                             margin: 10px 0;
                           "
                         >
                           <a
                             href="mailto:support@lexolent.com"
                             style="color: white; text-decoration: none"
                             >support@lexolent.com</a
                           >
                         </p>
                       </td>
                     </tr>
                   </table>
                 </td>
               </tr>
             </table>
           </td>
         </tr>
       </table>
     </body>
   </html>`;
}