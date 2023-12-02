export function accountVerification(firstName: string, url: string) {
  return `
  <p>Hello ${firstName},</p>
  </br>

  <p>
  We hope this message finds you in good spirits. Your presence on our platform brings immense value to our community, and we are committed to ensuring a secure and enjoyable experience for all our users.</p>

  <p>In our ongoing efforts to enhance security, we kindly ask you to take a moment to verify your account. This quick verification process helps us maintain the utmost security standards and ensures that your account remains protected.</p>
  
  <p>To complete the verification, simply click on the following link: ${url}</p>
  
  <p>Thank you for being a valued member of our community, and we look forward to continuing to provide you with a seamless and secure experience.

  Warm regards,
  
  Digital-Thought Team</p>
  `;
}
