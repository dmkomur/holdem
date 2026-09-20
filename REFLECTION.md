# Refleksjonsnotat – Video Poker

## Om prosjektet

Dette er et individuelt prosjekt hvor jeg har laget et klassisk Video Poker-spill. Jeg valgte å bruke et retro **pixel art-design** med et **romtema (space theme)** fordi jeg synes det gir spillet en morsom og unik stil.

## Designprosess

I starten tegnet jeg noen enkle skisser i et tegneprogram for å planlegge hvordan skjermen og kortene skulle se ut. Etter det prøvde jeg meg fram med farger og CSS-stiler direkte i koden til jeg ble fornøyd med utseendet.

## Teknologier og erfaringer

Prosjektet er bygget med:

- **React** og **TypeScript** for å lage komponenter og holde orden på koden.
- **Vite** for rask utvikling og bygging.

### Zustand (Ny teknologi)

Dette var første gang jeg brukte **Zustand** til tilstandshåndtering (state management). Det var veldig enkelt å lære og passet perfekt til dette spillet. En stor fordel var å bruke Zustand sin `persist`-middleware. Den gjorde det veldig lett å lagre spillernavn og saldo i `localStorage`, slik at dataene ikke forsvinner når man oppdaterer siden.

## Konklusjon

Prosjektet var lærerikt og gøy å jobbe med. Jeg fikk kombinert læring av ny teknologi (Zustand) med å lage et fungerende spill med et gjennomført visuelt tema.
