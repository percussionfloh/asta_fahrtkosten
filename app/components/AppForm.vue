<script setup>
import { ref } from 'vue'

const antrag = ref(null)
const rechnung = ref(null)
const bestaetigung = ref(null)

function onFileChange(event, type) {
  const file = event.target.files[0]

  if (type === 'antrag') {
    antrag.value = file
  } else if (type === 'rechnung') {
    rechnung.value = file
  } else if (type === 'bestaetigung') {
    bestaetigung.value = file
  }
}

const isSubmitting  = ref( false ) 
const wasSent       = ref( false ) 
const serverMessage = ref( '' ) 
const submitForm = async () => {
    if ( isSubmitting.value ) return

    isSubmitting.value = true

    serverMessage.value = ''

    try {
      const data = await $fetch( '/api/mail', {
        method: 'POST',
        body: {
          antrag:    antrag.value, 
          rechnung:   rechnung.value, 
          bestaetigung: bestaetigung.value
        }
      } )

      // The back-end lets us know whether the email was sent as `true` or `false`
      if ( data.sent ) {
        wasSent.value = true
        serverMessage.value = data.message
      } else {
        serverMessage.value = data.message
      }

    } catch ( error ) {
      // If something goes wrong (e.g., network error or server error),
      // we'll catch the error here and adjust the output message, which is
      // provided by Nodemailer itself in the `error` object.
      console.error( 'Error submitting form: ', error )

      serverMessage.value = String(error?.message ?? error)
    } finally {
      // This `finally` block runs whether the submission succeeded or failed.
      // We're done submitting, so we set this back to false.
      isSubmitting.value = false
    }
  }
    const resetForm = () => {
    antrag.value         = ''
    rechnung.value       = ''
    bestaetigung.value   = ''
    wasSent.value       = false
    serverMessage.value = ''
  }
</script>

<template>
  <div>
    <div v-if="wasSent" class="text-center p-8 bg-neutral-700">
      <h3 class="text-2xl font-bold mb-4">
        Message Sent!
      </h3>
      <p class="mb-6">
        {{ serverMessage }}
      </p>
      <button type="button" class="bg-cyan-500" @click="resetForm">
        Send Another Message
      </button>
    </div>



    <form v-else action="/" method="post" class="mb-6" @submit.prevent="submitForm">
      <div  class="grid justify-items-center grid-cols-4 p-4 gap-3 w-full">
      <div class="w-full">
        <UFileUpload for="user-antrag" :dropzone="true" label="ausgefüllter Antrag" class="w-full" />
        <input id="user-antrag" name="antrag" type="file" accept=".pdf" required @change="onFileChange($event, 'antrag')"/>
      </div>

      <div class="w-full" >
        <UFileUpload for="user-rechnung" :dropzone="true" label="ausgefüllte Rechnung" class="w-full" />
        <input id="user-rechnung" name="rechnung" type="file" accept=".pdf" required @change="onFileChange($event, 'rechnung')"/>
      </div>

       <div class="w-full">
        <UFileUpload for="user-bestaetigung" :dropzone="true" label="Teilnahmebestätigung" class="w-full" />
        <input id="user-bestaetigung" name="bestaetigung" type="file" accept=".pdf" required @change="onFileChange($event, 'bestaetigung')"/>
      </div>
      <div class="w-full">
        <UTextarea :rows="9" class="w-full border-red-500" placeholder="weitere Infos für den AStA"/>
        </div>
</div>

      <!-- This is the place where we'll display an error message if the form was not sent successfully -->
      <div v-if="serverMessage && !wasSent" class="p-4 mb-8 text-center bg-red-900 text-red-300">
        {{ serverMessage }}
      </div>

      <!-- Display a spinner and a message attempting to send the email -->
      <div v-if="isSubmitting" class="text-center mb-10">
        <Icon name="svg-spinners:3-dots-scale" size="48" />
        <p>Sending Message...</p>
      </div>
    
      <div class="flex items-center justify-between">
        <UButton class="bg-red-500 hover:bg-red-900 active:bg-red-500" label="Absenden" />        
        <UButton class="bg-gray-500 hover:bg-gray-700 active:bg-gray-500" label="Eingaben löschen"/>
      </div>
    </form>
  </div>
</template>