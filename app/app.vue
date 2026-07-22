<script setup>
const { t } = useI18n();
useHead({
  title: 'Fahrtkostenzuschuss AStA HfM Freiburg',
})

const { locale } = useI18n()

const { data: general } = await useAsyncData(() =>
  queryCollection('docs')
    .path(`/${locale.value}/general`)
    .first()
)
const { data: responsibility } = await useAsyncData(() =>
  queryCollection('docs')
    .path(`/${locale.value}/responsibility`)
    .first()
)
const { data: waswird } = await useAsyncData(() =>
  queryCollection('docs')
    .path(`/${locale.value}/waswird`)
    .first()
)
const { data: hohe } = await useAsyncData(() =>
  queryCollection('docs')
    .path(`/${locale.value}/hohe`)
    .first()
)
const { data: wie } = await useAsyncData(() =>
  queryCollection('docs')
    .path(`/${locale.value}/wie`)
    .first()
)
const docs = await queryCollection('docs').all()
console.log(docs)
</script>
<template>
  <div class="flex justify-start p-4">
    <img src="/assets/logo_mh.png" class="max-h-15 md:max-h-25" alt="Logo HfM Freiburg">
  </div>

    <div class="justify-items-center p-5">
      <h1 class="text-3xl md:text-5xl text-red-600 font-bold">Fahrtkostenzuschuss</h1>
    </div>

  <UContainer class="grid grid-rows-15 justify-center">
    <div class="justify-items-center" >
      <div>
        <img src="/assets/picture_ice.png" alt="ICE-Zug" class="max-h-150">
      </div>
      <div class="p-10">
        <h2 class="text-2xl md:text-4xl text-red-600 font-bold">Antrag auf einen Fahrtkostenzuschuss</h2>
      </div>

      <div class="p-5">  
        <article>
          <ContentRenderer v-if="general" :value="general" />
        </article>      
      </div>
      <div>
        <a href="fahrtkostenantrag.pdf" download>
          <UButton class="bg-red-500 hover:bg-red-800" size="xl" label="Antrag herunterladen (pdf)" icon="i-lucide-download" />
        </a>
      </div>
      <div class="p-5">
        <article>
          <ContentRenderer v-if="responsibility" :value="responsibility" />
        </article>  
      </div>

      <AppForm />

      <div class="p-7">
        <h2 class="text-2xl md:text-4xl text-red-600 font-bold">Was wird bezuschusst?</h2>
      </div>
      <div class="p-3">
        <article>
          <ContentRenderer v-if="waswird" :value="waswird" />
        </article>  
      </div>
      
      <div class="p-10">
        <h2 class="text-2xl md:text-4xl text-red-600 font-bold">Höhe des Zuschusses</h2>
      </div>
      <div class="p-3">
        <article>
          <ContentRenderer v-if="hohe" :value="hohe" />
        </article>
      </div>
    
        <div class="p-10">
          <h2 class="text-2xl md:text-4xl text-red-600 font-bold">Wie funktioniert die Antragsstellung?</h2>
        </div>
        <div class="p-3">
        <article>
          <ContentRenderer v-if="wie" :value="wie" />
        </article>
        </div>
    </div>
  </UContainer>
</template>
