<template>
  <div id="recover-password">
    <v-card id="card-recover-password">
      <v-card-title>
        <div>
          <h3>
            Recuperar Senha
          </h3>
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
        >
        </v-text-field>
      </v-form>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn :to="recoverAction" class="recover-password" outlined
              >Enviar</v-btn
            >
          </v-col>
          <v-col>
            <v-btn :to="abortAction" class="abort-recover" outlined
              >Cancelar</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
      <v-snackbar :timeout="6000" :bottom="true" v-model="snackbar">
        Email não cadastrado!
        <v-btn small color="error" @click.native="snackbar = false"
          >Fechar</v-btn
        >
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Recover-Password",
  data() {
    return {
      valid: true,
      snackbar: false,
      user: {
        email: ""
      },
      rules: {
        email: [
          v =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) ||
            "E-mail inválido!"
        ]
      },
      abortAction: "/",
      recoverAction: "/recover-password/2"
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
#recover-password {
  height: 100%;
  display: flex;
  align-items: center;
  background-size: cover;
}

#card-recover-password {
  margin: auto;
  align-content: center;
  align-items: center;
  align-self: center;
}

#form {
  padding: 0px 20px 0px 20px;
}

#card-recover-password .v-card__title {
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

.v-card__actions .recover-password,
.v-card__actions .abort-recover {
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
