import { transporter } from "../Config/Emailconfig.js";
import { Verification_Email_Template, Welcome_Email_Template } from "../Config/Emailtemplete.js";

export const SendVerificationCode = async (email,verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"StayMantra - Team" <nikhilrajput060@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Verify your email address - stayMantra", // Subject line
      text: `Hi there! Please use the following code to verify your email address: ${verificationCode}`, // plain text body
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ), // html body
    });
    console.log("email sent successfully",response)
  } catch (error) {
    console.error("error in sending email",error)
  }
};

export const SendWelcomeEmail = async(email,name)=>{
    try {
        const response = await transporter.sendMail({
            from: '"StayMantra - Team" <nikhilrajput060@gmail.com>', // sender address
            to: email, // list of receivers
            subject: `Welcome ${name}  - StayMantra`, // Subject line
            text: 'Welcome to Our Community', // plain text body
            html:Welcome_Email_Template.replace("{name}", name), // html body
        })
        // console.log(Welcome_Email_Template.replace("{name}", name));
        // console.log('Message sent: %s', info.messageId);
        console.log("email sent successfully",response);
        
    } catch (error) {
        console.log("Error sending email", error);
    }
}

