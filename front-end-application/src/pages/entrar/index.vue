<template>
  <div id="sign-in">
      <v-card id="card-sign-in">
        <v-card-title>
          <div>
            <h3>Login</h3>
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
            v-model="user.email"
            :rules="rules.email"
            label="E-mail"
            prepend-icon="mdi-email"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :append-icon="
              invisibility ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            @click:append="() => (invisibility = !invisibility)"
            :type="invisibility ? 'password' : 'text'"
            :rules="rules.password"
            label="Senha"
            prepend-icon="mdi-lock-outline"
            required
          ></v-text-field>
        </v-form>
        <v-card-actions>
          <v-row>
            <v-col>
              <!-- <v-btn @click="submit" class="sign-in" outlined>Entrar</v-btn> -->
              <v-btn :to="homeAction" class="sign-in" outlined>Entrar</v-btn>
            </v-col>
            <v-col>
              <v-btn :to="signUpAction" class="register" outlined
                >Cadastrar-se</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <router-link :to="recoverAction" class="forgot-password"
              >Esqueci a senha</router-link
            >
          </v-row>
        </v-card-actions>
        <v-snackbar :timeout="6000" :bottom="true" v-model="snackbar">
          Usuário ou senha incorretos!
          <v-btn small color="error" @click.native="snackbar = false"
            >Fechar</v-btn
          >
        </v-snackbar>
      </v-card>
  </div>
</template>

<script>
export default {
  name: "Sign-In",
  data() {
    return {
      valid: true,
      invisibility: true,
      snackbar: false,
      user: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          v =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) ||
            "E-mail inválido!"
        ],
        password: [v => !!v || "Senha é obrigatória!"]
      },
      signUpAction: "/sign-up",
      recoverAction: "/recover-password",
      homeAction: "/home"
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$auth.login({
          body: JSON.stringify(this.user),
          success: function(response) {
            localStorage.token = response.body.data.token;
          },
          error: function() {
            delete localStorage.token;
            this.snackbar = true;
          },
          rememberMe: true,
          redirect: "/home"
        });
      }
    }
  }
};
</script>

<style scoped>
#sign-in {
  height: 100%;
  display: flex;
  align-items: center;
  background-size: cover;
}

#card-sign-in {
  margin: auto;
  align-content: center;
  align-items: center;
  align-self: center;
}

#form {
  padding: 0px 20px 0px 20px;
}

#card-sign-in .v-card__title {
  display: flex;
  width: 400px;
  height: 150px;
  margin: auto;
  margin-bottom: 50px;

  background: linear-gradient(90deg, #006ea8 0%, #192c40 100%);
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.12), 0px 5px 15px rgba(0, 0, 0, 0.5);
  border-radius: 3px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: #ffffff;
}

.v-card__title div {
  margin: auto;
}

.v-card .v-card__actions {
  display: block;
}

.v-card__actions .sign-in,
.v-card__actions .register {
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

.v-card__actions .forgot-password {
  width: 87px;
  height: 24px;
  margin-left: 10%;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 24px;
  /* identical to box height, or 240% */

  display: flex;
  align-items: center;
  letter-spacing: 0.16px;
  text-transform: uppercase;
  font-feature-settings: "pnum" on, "lnum" on;

  color: #006ea8;
}
</style>
