<template>
  <div id="nav-bar">
    <v-app-bar>
      <v-toolbar-title>Encomendado</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="signOutAction" class="sign-out" text>
        Sair
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      signOutAction: "/"
    };
  }
};
</script>

<style scoped>
.v-app-bar {
  width: 100%;
  max-width: none;

  background: #006ea8;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.12);

  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 25px;

  color: #ffffff;
}

.sign-out {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;

  color: #ffffff;
}
</style>
