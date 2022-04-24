/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */
import previewEmail from "preview-email"
import { sendMail } from "integrations/mail"

export function forgotPasswordMailer({ to, token }) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  //const origin = "https://makemycurriculum.plataformaelectronicacr.com"
  const resetUrl = `${origin}/reset-password?token=${token}`
  const msg = {
    from: "noreply@plataformaelectronicacr.com",
    to,
    subject: "Your Password Reset Instructions",
    html: `
      <h1>Reset Your Password</h1>
      <h3>NOTE: You must set up a production email integration in mailers/forgotPasswordMailer.ts</h3>

      <a href="${resetUrl}">
        Click here to set a new password
      </a>
    `,
  }
  return {
    async send() {
      console.log(process.env)
      if (process.env.NODE_ENV === "production") {
        // TODO - send the production email, like this:
        await sendMail(msg)

        // await postmark.sendEmail(msg)
        //throw new Error("No production email implementation in mailers/forgotPasswordMailer")
      } else {
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}
