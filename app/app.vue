<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { t } = useI18n();

useHead({
  title: 'Fahrtkostenzuschuss AStA HfM Freiburg',
})

function useDoc(name: string) {
  return useAsyncData(
    name,
    () =>
      queryCollection('docs')
        .path(`/${locale.value}/${name}`)
        .first(),
    {
      watch: [locale]
    }
  )
}

const { data: general } = await useDoc('general')
const { data: responsibility } = await useDoc('responsibility')
const { data: waswird } = await useDoc('waswird')
const { data: hohe } = await useDoc('hohe')
const { data: wie } = await useDoc('wie')
</script>

<template>
  <div class="flex justify-between items-start p-4">
    <div class="flex justify-start p-4">
      <img src="/assets/logo_mh.png" class="max-h-15 md:max-h-25" alt="Logo HfM Freiburg">
    </div>

    <UDropdownMenu :items="locales.map(l => ({label: l.code.toUpperCase(),to: switchLocalePath(l.code)}))">
    <UButton icon="i-lucide-languages" variant="ghost" color="neutral"/>
    </UDropdownMenu>
  </div>


    <div class="justify-items-center p-5">
      <h1 class="text-3xl md:text-5xl text-red-600 font-bold">{{ $t('Fahrtkostenzuschuss') }}</h1>
    </div>

  <UContainer class="justify-center">
    <div class="justify-items-center" >
      <div>
        <img src="/assets/picture_ice.png" alt="ICE-Zug" class="max-h-150">
      </div>
      <div class="p-10">
        <h2 class="text-2xl md:text-4xl text-red-600 font-bold">{{ $t('Antrag auf einen Fahrtkostenzuschuss') }}</h2>
      </div>

      <div class="p-5">  
        <article>
          <ContentRenderer v-if="general" :value="general" />
        </article>      
      </div>
      <div>
        <a href="fahrtkostenantrag.pdf" download>
          <UButton class="bg-red-500 hover:bg-red-800" size="xl" :label="$t('Antrag herunterladen (pdf)')" icon="i-lucide-download" />
        </a>
      </div>
      <div class="p-5">
        <article>
          <ContentRenderer v-if="responsibility" :value="responsibility" />
        </article>  
      </div>

      <AppForm />

      <div class="p-7">
        <h2 class="text-2xl md:text-4xl text-red-600 font-bold">{{ $t('Was wird bezuschusst?') }}</h2>
      </div>
      <div class="p-3">
        <article>
          <ContentRenderer v-if="waswird" :value="waswird" />
        </article>  
      </div>
      
      <div class="p-10">
        <h2 class="text-2xl md:text-4xl text-red-600 font-bold">{{ $t('Höhe des Zuschusses') }}</h2>
      </div>
      <div class="p-3">
        <article>
          <ContentRenderer v-if="hohe" :value="hohe" />
        </article>
      </div>
    
        <div class="p-10">
          <h2 class="text-2xl md:text-4xl text-red-600 font-bold">{{ $t('Wie funktioniert die Antragsstellung?') }}</h2>
        </div>
        <div class="p-3">
        <article>
          <ContentRenderer v-if="wie" :value="wie" />
        </article>
        </div>
    </div>
  </UContainer>
</template>
