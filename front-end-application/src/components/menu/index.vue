<template>
  <div id="menu-bar">
    <v-card>
      <v-navigation-drawer permanent>
        <v-list-item>
          <v-col>
            <v-avatar size="62">
              <v-img src="../../assets/avatar.png"></v-img>
            </v-avatar>
            <v-row>
              <v-list-item-title>Fulano de Tal</v-list-item-title>
            </v-row>
          </v-col>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.path"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-list-item-subtitle>
              Suporte
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <v-list dense nav>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ suport.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ suport.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MenuBar",
  data() {
    return {
      items: [
        {
          title: "Encomendas",
          icon: "mdi-view-dashboard-outline",
          path: "/home"
        },
        { title: "Perfil", icon: "mdi-account-outline", path: "/profile" }
      ],
      suport: { title: "Fale Conosco", icon: "mdi-face-agent" }
    };
  }
};
</script>

<style scoped>
#menu-bar {
  margin-top: 10px;
  margin-left: 10px;
}

#menu-bar .v-card {
  width: 255px;
  height: 100%;
  max-width: none;

  background: #ffffff;
  border: 1px solid rgba(63, 63, 68, 0.005);
  box-shadow: 0px 1px 3px rgba(63, 63, 68, 0.15),
    0px 1px 0px rgba(63, 63, 68, 0.05);
  border-radius: 10px;
}
</style>
