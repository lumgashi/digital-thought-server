/**
 * @description This fuction is using to generate an email template
 * @param {String} body - email body content
 * @returns {String} - generate an email template
 */

export function generateEmailTemplate({ body }) {
  return `<!DOCTYPE html>
       <html lang="en">
         <head>
           <meta charset="UTF-8" />
           <meta http-equiv="X-UA-Compatible" content="IE=edge" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 
           <title></title>
         </head>
         <body style="background: #F0F2F5; height: 100%; margin: 0; padding: 0;">
           <table
             cellpadding="0"
             cellspacing="0"
             width="100%"
             style="background: #F0F2F5; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
           >
             <tr>
               <td align="center" valign="top" style="padding: 20px;">
                 <table
                   cellpadding="0"
                   cellspacing="0"
                   width="100%"
                   style="max-width: 600px; background: #FFFFFF; border: 1px solid #CFD8DC; border-top: 4px solid #023A4B; margin: 0 auto;"
                 >
                   <tr>
                     <td align="center" valign="top" style="padding: 20px;">
                       <table
                         cellpadding="0"
                         cellspacing="0"
                         width="100%"
                         style="border-collapse: collapse;"
                       >
                         <tr>
                           <td align="center" valign="top" style="padding: 10px;">
                             <img
                               src="https://lexolent.appbites.dev/email-icons/lexolent.png"
                               alt="lexolent"
                               style="display: block; max-width: 100%;"
                             />
                           </td>
                           <td align="center" valign="top" style="padding: 10px; background: linear-gradient(91.38deg, rgba(240, 242, 245, 0) -2.23%, rgba(240, 242, 245, 0.2) 22.89%, #8AC5D7 168.35%);">
                             <img
                               src="https://lexolent.appbites.dev/email-icons/arrow.png"
                               alt="lexolent"
                               style="display: block; max-width: 100%;"
                             />
                           </td>
                         </tr>
                       </table>
                       <table
                         cellpadding="0"
                         cellspacing="0"
                         width="100%"
                         style="border-collapse: collapse; margin-top: 20px;"
                       >
                         <tr>
                           <td align="left" valign="top" style="padding: 20px;">
                         
                           ${body}
                       
                           </td>
                         </tr>
                       </table>
                       <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                         <tr>
                           <td align="center" valign="top" style="padding: 10px;">
                             <img
                               src="https://lexolent.appbites.dev/email-icons/lxt.png"
                               alt="lexolent"
                               style="display: block; max-width: 100%;"
                             />
                           </td>
                         </tr>
                         <tr>
                           <td align="center" valign="top" style="padding: 10px;">
                             <p style="font-weight: 400; font-size: 14px; line-height: 22px; color: rgba(0, 0, 0, 0.85); margin: 10px 0;">Lexolent Team</p>
                             <p style="font-weight: 400; font-size: 14px; line-height: 22px; color: rgba(0, 0, 0, 0.85); margin: 10px 0;">
                               <a href="mailto:support@lexolent.com" style="color: rgba(0, 0, 0, 0.85); text-decoration: none;">support@lexolent.com</a>
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
