<script setup>
useHead({
  title: 'Fahrtkostenzuschuss AStA HfM Freiburg',
})
</script>
<template>
  <div class="flex justify-start p-4">
    <img src="/assets/logo_mh.png" class="max-h-15 md:max-h-25" alt="Logo HfM Freiburg">
  </div>
    <div class="justify-items-center p-5">
      <h1 class="text-3xl md:text-5xl text-red-600 font-bold">Fahrtkostenzuschuss</h1>
    </div>
  <UContainer class="grid grid-rows-10 justify-center">
    <div class="justify-items-center" >
      <div>
        <img src="/assets/picture_ice.png" alt="ICE-Zug" class="max-h-150">
      </div>
      <div class="p-7">
        <h2 class="text-2xl md:text-4xl text-red-600 font-bold">Antrag auf einen Fahrtkostenzuschuss</h2>
      </div>
      <div class="p-5">  
        <p>Dieser Antrag ist dafür gedacht, Fahrten von Studierenden der Musikhochschule zu Veranstaltungen zu bezuschussen, die im Rahmen des Studiums stattfinden oder zu Studienzwecken dienen. <br>
           Da wir leider nicht unbegrenzt Geld haben, können wir jede*n Studierende*n pro Semester mit höchstens 100€ bezuschussen. <br>
           Weitere Infos zu den Voraussetzungen für einen Zuschuss, zur Höhe des Zuschusses oder zur Antragsstellung findest du unten oder auf dem Antragsformular.</p>
      </div>
      <div>
        <UButton class="bg-red-500 hover:bg-red-800" size="xl" label="Antrag herunterladen (pdf)" icon="i-lucide-download"></UButton>
      </div>
      <div class="p-5">
        <p>Die Bezuschussung von Fahrtkosten zu Studienzwecken aus Haushaltsmitteln des AStA der Hochschule für Musik Freiburg ist ein Angebot,
           das nur aufrechterhalten werden kann, wenn alle Beteiligten ehrlich und verantwortungsbewusst damit umgehen. <br>
           Sollte sich herausstellen, dass dieses Angebot missbraucht wird, so kann der AStA dieses Angebot zurücknehmen.</p>
      </div>
    </div>

  </UContainer>
</template>
