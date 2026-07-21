<script setup>
import { ref } from 'vue'

useHead({
  title: 'Fahrtkostenzuschuss AStA HfM Freiburg',
})

const antrag = ref(null)
const rechnung = ref(null)
const bestaetigung = ref(null)

const onSubmit = async (event) => {
  event.preventDefault()

  const formData = new FormData()

  formData.append('antrag', antrag.value)
  formData.append('rechnung', rechnung.value)
  formData.append('bestaetigung', bestaetigung.value)

  await $fetch('/api/mail', {
    method: 'POST',
    body: formData
  })
}

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

      <div class="grid justify-items-center grid-cols-4 p-4 gap-3">
        <UForm @submit="onSubmit">
          <UFileUpload v-model="antrag" :dropzone="true" label="ausgefüllter Antrag" class="w-full" />
          <UFileUpload v-model="rechnung" :dropzone="true" label="Rechnung(en), bitte als PDF zusammengefügt" class="w-full" />
          <UFileUpload v-model="bestaetigung" :dropzone="true" label="Teilnahmebestätigung" class="w-full"/>
          <UTextarea :rows="9" class="w-full border-red-500" placeholder="weitere Infos für den AStA"/>
          <UButton label="Submit" />        
        </UForm>
      </div>

      <div class="p-7">
        <h2 class="text-2xl md:text-4xl text-red-600 font-bold">Was wird bezuschusst?</h2>
      </div>
      <div class="p-3">
        <p>
          (1) Mithilfe dieses Antrags können ausschließlich Fahrtkosten für Veranstaltungen bezuschusst werden, die der studienbezogenen Weiterbildung dienen. Dazu gehören u.a. Wettbewerbe, Meisterkurse, Probespiele, Fachvorträge und hochschulpolitische Veranstaltungen.
           Veranstaltungen, bei denen eine Gage ausgezahlt wird, werden nicht bezuschusst. Ob die beantragte Veranstaltung in diese Kategorien fällt obliegt der Entscheidung des AStA.
          <br><br>(2) Bezuschusst werden Fahrtkosten bei Fahrten mit öffentlichen Verkehrsmitteln, mit eigenem oder mit geliehenem PKW. Fahrten in fremden PKWs können ebenfalls bezuschusst werden, Antragssteller:in muss aber immer die fahrende Person sein. 
          Flüge werden nicht bezuschusst. Tickets für Nahverkehrsangebote, z. B. Stadttickets werden nicht bezuschusst. Das Deutschlandticket wird mit 20€ bezuschusst.
          <br><br>(3) Es können ausschließlich Fahrtkosten von immatrikulierten Studierenden der Hochschule für Musik Freiburg bezuschusst werden.
          <br><br>(4) Da dem AStA für Fahrtkosten nur ein begrenztes Budget zur Verfügung steht, ist die Bewilligung des Zuschusses sowie die Höhe der einzelnen Zuschüsse von der Anzahl der eingehenden Anträge abhängig. Ein Anspruch auf Bezuschussung der Fahrtkosten besteht nicht.
        </p>
      </div>
      
      <div class="p-10">
        <h2 class="text-2xl md:text-4xl text-red-600 font-bold">Höhe des Zuschusses</h2>
      </div>
      <div class="p-3">
        <p>
          Bei der Berechnung des Zuschusses gelten folgende Richtlinien: <br><br>
          (1) Bezuschusst wird in der Regel der volle Fahrtkostenbetrag. Jede:r Student:in kann jedoch pro Semester maximal 100€ Zuschuss erhalten. Überweisungen unter 15€ werden nicht vorgenommen. <br><br>
          (2) Bei Fahrten mit öffentlichen Verkehrsmitteln wird der Fahrpreis der 2. Klasse bezuschusst. <br><br>
          (3) Bei Fahrten mit eigenem sowie geliehenem PKW wird der Berechnung eine Kilometerpauschale von 30 ct zugrunde gelegt. <br><br>
          (4) Bei Fahrten, bei denen andere Studierende der Hochschule für Musik Freiburg mitgenommen wurden, wird der Fahrtkostenbetrag durch die Anzahl aller Personen im Auto geteilt und pro Person abgerechnet. Der komplette Zuschuss für alle Personen wird an die antragstellende Person ausgezahlt.
        </p>
      </div>
    
        <div class="p-10">
          <h2 class="text-2xl md:text-4xl text-red-600 font-bold">Wie funktioniert die Antragsstellung?</h2>
        </div>
        <div class="p-3">
          <p>
            (1) Anträge auf Fahrtkostenzuschuss können ausschließlich von immatrikulierten Studierenden der Hochschule für Musik Freiburg gestellt werden. <br><br>
            (2) Pro eingereichtem Antrag kann die Bezuschussung der Hin- und Rückfahrtkosten für jeweils eine Veranstaltung geltend gemacht werden. <br><br>
            (3) Fahrtkosten können nur nachträglich bezuschusst werden. <br><br>
            (4) Die Fahrt darf frühestens zwei Tage vor Beginn und spätestens zwei Tage nach Ende der Veranstaltung angetreten werden. <br><br>
            (5) Der Antrag auf einen Zuschuss muss innerhalb eines Monats nach Ende der Veranstaltung schriftlich mit dem dafür vorgesehenen Formular beim AStA eingereicht werden. Alle notwendigen Belege müssen zu dieser Frist eingereicht sein, sonst ist der Antrag ungültig. <br><br>
            (6) Folgende Dokumente sind beim AStA einzureichen: <br><br>
            a. Der ausgefüllte Antrag (Seite 1 und 2) <br><br>
            b. Eine Teilnahmebestätigung für die entsprechende Veranstaltung (Kopie) mit Bestätigung, dass keine bzw. wie viel Fahrtkosten bereits erstattet wurden <br><br>
            c. Bei einer Fahrt mit öffentlichen Verkehrsmitteln: Die Fahrkarte im Original, der Betrag muss ersichtlich sein <br><br>
            d. Bei einer Fahrt mit eigenem PKW: Der Tankbeleg im Original <br><br>
            e. Bei einer Fahrt mit geliehenem PKW: Rechnung des Anbieters mit Kilometeranzahl <br><br>
            (7) Alle einzureichenden Unterlagen sind in einem Umschlag auf dieser Seite hochzuladen. <br><br>
            (8) Der AStA entscheidet nach Ende der Antragsfrist über Bewilligung und Höhe des Fahrtkostenzuschusses und leitet den Antrag an die Verwaltung der Hochschule weiter. Diese überweist den bewilligten Betrag. Es besteht kein Anspruch auf Bezuschussung. Jeder Antrag obliegt der Entscheidung des AStA. <br><br>
            (9) Falls Fahrtkosten von anderer Seite (z.B. Förderverein der Hochschule) bezuschusst werden, kann nur noch weitere Bezuschussung beantragt werden, wenn die Teilerstattung weniger als 50% des Rechnungsbetrags beträgt. In diesem Fall kann dann der verbleibende Restbetrag (maximal 100€) bezuschusst. Der AStA behält sich vor, Mehrfachbezuschussung zu überprüfen.
          </p>
        </div>
    </div>
  </UContainer>
</template>
