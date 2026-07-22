<script setup>
import { ref } from 'vue'

const antrag = ref(null)
const rechnung = ref(null)
const bestaetigung = ref(null)
const kommentar = ref('')
const firstName = ref('')
const lastName = ref('')

const isSubmitting = ref(false)
const wasSent = ref(false)
const serverMessage = ref('')

const submitForm = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  serverMessage.value = ''

  try {
    const formData = new FormData()

    if (antrag.value) {
      formData.append('antrag', antrag.value)
    }

    if (rechnung.value) {
      formData.append('rechnung', rechnung.value)
    }

    if (bestaetigung.value) {
      formData.append('bestaetigung', bestaetigung.value)
    }

    formData.append('kommentar', kommentar.value)

    formData.append('firstName', firstName.value)

    formData.append('lastName', lastName.value)

    const data = await $fetch('/api/mail', {
      method: 'POST',
      body: formData
    })

    wasSent.value = data.sent
    serverMessage.value = data.message

  } catch (error) {
    console.error(error)

    wasSent.value = false
    serverMessage.value = 'Beim Senden ist ein Fehler aufgetreten.'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  antrag.value = null
  rechnung.value = null
  bestaetigung.value = null
  kommentar.value = ''

  wasSent.value = false
  serverMessage.value = ''
}
</script>

<template>
  <div>
    <div v-if="wasSent">
      <h3 class="text-2xl p-8 font-bold mb-4 text-red-600">
        Antrag erfolgreich gesendet!
      </h3>
      <p class="mb-6">
        {{ serverMessage }}
      </p>
    </div>

    <form v-else action="/" method="post" class="mb-6" @submit.prevent="submitForm">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 w-full">
        <div class="flex flex-col gap-3 w-full">
          <UInput v-model="firstName" class="w-full" :placeholder="$t('Vorname')"/>
          <UInput v-model="lastName" class="w-full" :placeholder="$t('Nachname')"/>
        </div>

        <div class="w-full">
          <UFileUpload v-model="antrag" :dropzone="true" :label="$t('ausgefüllter Antrag')" class="w-full"/>
        </div>

        <div class="w-full">
          <UFileUpload v-model="rechnung" :dropzone="true" :label="$t('ausgefüllte Rechnung')" class="w-full"/>
        </div>

        <div class="w-full">
          <UFileUpload v-model="bestaetigung" :dropzone="true" :label="$t('Teilnahmebestätigung')" class="w-full"/>
        </div>

        <div class="w-full">
          <UTextarea v-model="kommentar" :rows="9" class="w-full" :placeholder="$t('weitere Infos für den AStA')"/>
        </div>

        <div class="md:col-span-5 flex md:flex-row justify-center gap-4 mt-4">
          <UButton type="reset" class="bg-gray-500 hover:bg-gray-700 active:bg-gray-500" :label="$t('Eingaben löschen')" @click="resetForm"/>

          <UButton type="submit" class="bg-red-500 hover:bg-red-900 active:bg-red-500" :label="$t('Absenden')"/>
        </div>
      </div>

      <div v-if="serverMessage && !wasSent" class="p-4 mb-8 text-center bg-red-900 text-red-300">
        {{ serverMessage }}
      </div>

      <div v-if="isSubmitting" class="text-center mb-10">
        <Icon name="svg-spinners:3-dots-scale" size="48" />
        <p>{{ $t('Antrag wird gesendet') }}</p>
      </div>
    </form>
  </div>
</template>