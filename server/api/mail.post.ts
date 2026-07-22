import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)

  if (!form) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Keine Formulardaten empfangen.'
    })
  }

  const config = useRuntimeConfig()

  config.turnstileSecret

  const firstName =
  form.find(field => field.name === 'firstName')?.data.toString().trim() ?? ''

  const lastName =
  form.find(field => field.name === 'lastName')?.data.toString().trim() ?? ''

  const kommentar =
    form.find(field => field.name === 'kommentar')?.data.toString() ?? ''

  const attachments = form
  .filter(field => field.filename)
  .map(file => {
    let typ = file.name

    if (file.name === 'antrag') {
      typ = 'Antrag'
    } else if (file.name === 'rechnung') {
      typ = 'Rechnung'
    } else if (file.name === 'bestaetigung') {
      typ = 'Teilnahmebestaetigung'
    }

    return {
      filename: `${typ}_${lastName}_${firstName}.pdf`,
      content: file.data,
      contentType: file.type
    }
  })

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

      text: `Ein neuer Antrag auf Fahrtkostenzuschuss wurde eingereicht. 
      
      Kommentar: ${kommentar}`,

      attachments
    })

    return {
      sent: true
    }

  } catch (error) {
    console.error(error)

    return {
      sent: false,
      message: 'An error occurred while sending the email.'
    }
  }
})