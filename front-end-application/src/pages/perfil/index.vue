<template>
  <div id="profile">
    <div>
      <home-nav-bar />
    </div>
    <div id="content">
      <home-menu-bar />
      <div id="content-area">
        <template>
          <v-card outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1"
                  >Fulano de Tal</v-list-item-title
                >
                <v-list-item-subtitle
                  >Greyhound divisely hello coldly
                  fonwderfully</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-avatar tile size="80">
              </v-list-item-avatar>
            </v-list-item>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn text>Carregar Imagem</v-btn>
              <v-btn text>Remover Imagem</v-btn>
            </v-card-actions>
          </v-card>
        </template>
        <v-card id="card-sign-up">
          <v-card-title>
            <div>
              <h3>Perfil</h3>
            </div>
          </v-card-title>
          <v-form
            id="form"
            ref="form"
            v-model="valid"
            @keyup.native.enter="submit"
            lazy-validation
          >
            <v-text-field
              v-model="user.name"
              :rules="rules.name"
              label="Nome Completo"
              prepend-icon="mdi-emoticon-excited-outline"
              required=""
            ></v-text-field>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="birthday"
                  label="Data de Nascimento"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="birthday"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
            <v-text-field
              v-model="user.email"
              :rules="rules.email"
              label="E-mail"
              prepend-icon="mdi-email"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              :type="'password'"
              :rules="rules.password"
              label="Senha"
              prepend-icon="mdi-lock-outline"
              required
            ></v-text-field>
            <v-text-field
              v-model="passwordConfirmation"
              :type="'password'"
              :rules="rules.password"
              label="Confirme a Senha"
              prepend-icon="mdi-shield-lock-outline"
              required
            ></v-text-field>
          </v-form>
          <v-card-actions>
            <v-row>
              <v-col>
                <v-btn @click="submit" class="confirm-register" outlined
                  >Confirmar</v-btn
                >
              </v-col>
              <v-col>
                <v-btn :to="abortAction" class="abort-register" outlined
                  >Cancelar</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
          <v-snackbar :timeout="6000" :bottom="true" v-model="snackbar">
            {{ text }}
            <v-btn small color="error" @click.native="snackbar = false"
              >Fechar</v-btn
            >
          </v-snackbar>
        </v-card>
      </div>
    </div>
    <div>
      <home-footer-bar />
    </div>
  </div>
</template>
<script>
import NavBar from "../../components/a-nav-bar/";
import MenuBar from "../../components/b-menu-bar/";
import FooterBar from "../../components/c-footer-bar/";

export default {
  name: "Profile",
  components: {
    "home-nav-bar": NavBar,
    "home-menu-bar": MenuBar,
    "home-footer-bar": FooterBar
  },
  data() {
    return {
      valid: true,
      invisibility: true,
      snackbar: false,
      birthday: null,
      menu: false,
      text: "",
      user: {
        name: "",
        birthday: "",
        email: "",
        password: ""
      },
      passwordConfirmation: "",
      rules: {
        name: [v => !!v || "Campo obrigatório!"],
        birthday: [],
        email: [
          v => !!v || "Campo obrigatório!",
          v =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) ||
            "E-mail inválido"
        ],
        password: [v => true]
      },
      abortAction: "/"
    };
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    submit() {
      if (this.$refs.form.validate()) {
        if (this.user.password == this.passwordConfirmation) {
          this.$emit("click");
        } else {
          this.text = "As senhas não estão iguais.";
          this.snackbar = true;
        }
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    changeRoute(router) {
      this.$router.push(router);
    }
  }
};
</script>

<style scoped>
#profile {
  height: 100%;
  display: block;
  background-size: cover;
}

#content {
  display: flex;
  justify-content: center;
}

#content-area {
  margin-top: 10px;
  margin-left: 10px;
  min-height: 570px;
  background: rgba(255, 255, 255, 0.93);
  border-radius: 10px;
}

#sign-up {
  height: 100%;
  display: flex;
  align-items: center;
}

#card-sign-up {
  margin: auto;
  align-content: center;
  align-items: center;
  align-self: center;
}

.v-card {
  max-width: none;
}

#form {
  padding: 0px 20px 0px 20px;
}

.v-picker {
  width: 100%;
  height: 100%;
  max-width: none;
}

#card-sign-up .v-card__title {
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
}

.v-card__title div {
  margin: auto;
}

.v-card__actions .confirm-register,
.v-card__actions .abort-register {
  width: 100px;
  height: 40px;
  width: 150px;

  background: #006ea8;
  box-shadow: 0px 2px 4px rgba(0, 110, 168, 0.25);
  border-radius: 3px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;

  color: #ffffff;
}
</style>
