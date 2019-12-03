<template>
  <div id="footer">
    <v-footer dark padless>
      <v-card class="flex transparent" flat tile>
        <v-card-title class="transparent">
          <v-btn text>
            Sobre o Projeto
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-for="link in links" :key="link" class="mx-4" icon>
            <v-icon size="24px">{{ link.icone }}</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          POO3 - FEAN Faculdade Energia de Administração e Negócios - &copy;
          {{ new Date().getFullYear() }}
        </v-card-title>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
  data() {
    return {
      links: [
        { icone: "mdi-github-circle", nome: "GitHub", link: "" },
        { icone: "mdi-linkedin-box", nome: "Linkedin", link: "" }
      ],
      about: { nome: "Sobre", link: "" }
    };
  }
};
</script>

<style scoped>
#footer {
  margin: auto;
}
.v-card,
.v-card__title,
.v-btn {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: white !important;
}
</style>
