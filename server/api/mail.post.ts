import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const transporter = nodemailer.createTransport(
    {
      host: config.MAILHOST,
      port: Number(config.MAILPORT),
      secure: true,
      auth: {
        user: config.MAILUSER,
        pass: config.MAILPASSWORD,
      },
    } as SMTPTransport.Options
  )

  try {
    const form = await readMultipartFormData(event)

                if (!form) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'Keine Dateien empfangen'
                })
                }

                console.log(form.map(file => ({
                name: file.name,
                filename: file.filename,
                type: file.type,
                size: file.data.length
                })))

    const mail = await transporter.sendMail({
      from: config.MAILUSER,
      to: config.CONTACTMAIL,
      subject: 'Fahrtkostenzuschuss Antrag',
      text: 'Neuer Antrag eingegangen',

        attachments: form?.map(file => ({
        filename: file.filename,
        content: file.data
        }))
    })

    return {
      success: true,
      messageId: mail.messageId,
    }

  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error
        ? error.message
        : String(error),
    })
  }
})