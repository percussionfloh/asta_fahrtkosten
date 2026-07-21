import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)

  if (!form) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Keine Formulardaten empfangen.'
    })
  }

  const kommentar =
    form.find(field => field.name === 'kommentar')?.data.toString() ?? ''

  const attachments = form
    .filter(field => field.filename)
    .map(file => ({
      filename: file.filename,
      content: file.data,
      contentType: file.type
    }))

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_TO,
      subject: 'Neuer Antrag auf Fahrtkostenzuschuss',

      text: `Ein neuer Antrag auf Fahrtkostenzuschuss wurde eingereicht. ${kommentar}`,

      attachments
    })

    return {
      sent: true
    }

  } catch (error) {
    console.error(error)

    return {
      sent: false,
      message: 'Beim Senden der E-Mail ist ein Fehler aufgetreten.'
    }
  }
})