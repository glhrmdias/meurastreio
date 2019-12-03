<template>
  <div id="home">
    <div>
      <home-nav-bar />
    </div>
    <div id="content">
      <home-menu-bar />
      <div id="content-area">
        <template>
          <v-toolbar flat>
            <v-toolbar-title>Encomendas</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pesquisar encomendas..."
              sigle-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn class="nova-encomenda" v-on="on" outlined
                  >Nova Encomenda</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-divider class="mx-4" inset></v-divider>
                <v-card-text>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedEncomenda.codigoRastreio"
                      label="Código de Rastreio"
                      id="codigo-rastreio"
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="editedEncomenda.name"
                      label="Nome"
                      id="nome-encomenda"
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="editedEncomenda.postDate"
                      label="Data de Postagem"
                      id="data-postagem"
                      outlined
                      disabled
                    ></v-text-field>
                    <v-text-field
                      v-model="editedEncomenda.status"
                      label="Status"
                      id="status-encomenda"
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-card-text>
                <v-card-actions>
                  <v-row :class="`justify-space-around`">
                    <v-btn text @click="save">Salvar</v-btn>
                    <v-btn text @click="close">Cancelar</v-btn>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <v-data-table
          :headers="headers"
          :items="encomendas"
          :search="search"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          :items-per-page="5"
          item-key="codigoRastreio"
          show-expand
          class="elevation-1"
        >
          <template v-slot:item.action="{ item }">
            <v-icon small @click="editEncomenda(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteEncomenda(item)">
              mdi-delete
            </v-icon>
          </template>

          <template v-slot:expanded-item="{ item }">
            <v-timeline dense cliped>
              <v-timeline-item
                v-for="(ocorrencia, i) in item.ocorrencias"
                :key="i"
                small
              >
                <td class="linha-tempo" :colspan="item.length">
                  <v-row>
                    <span v-text="ocorrencia.date"></span>
                  </v-row>
                  <v-row>
                    <span v-text="ocorrencia.time"></span>
                  </v-row>
                  <v-row>
                    <span v-text="ocorrencia.description"></span>
                  </v-row>
                </td>
              </v-timeline-item>
            </v-timeline>
            <!-- </v-card> -->
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template></v-data-table
        >
      </div>
    </div>
    <div>
      <home-footer-bar />
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/a-nav-bar";
import MenuBar from "../../components/b-menu-bar/";
import FooterBar from "../../components/c-footer-bar/";

export default {
  name: "Home",
  components: {
    "home-nav-bar": NavBar,
    "home-menu-bar": MenuBar,
    "home-footer-bar": FooterBar
  },
  data: () => ({
    search: "",
    expanded: [],
    singleExpand: true,
    dialog: false,
    headers: [
      {
        text: "Código de Rastreio",
        align: "left",
        sortable: false,
        value: "codigoRastreio"
      },
      { text: "Nome", value: "name" },
      { text: "Data Postagem", value: "postDate" },
      { text: "Status", value: "status" },
      { text: "Ações", sortable: false, value: "action" },
      { text: "Histórico", sortable: false, value: "data-table-expand" }
    ],
    encomendas: [],
    editedIndex: -1,
    encomenda: {
      codigoRastreio: "",
      name: "",
      postDate: "",
      status: "",
      ocorrencias: []
    },
    editedEncomenda: {
      codigoRastreio: "",
      name: "",
      postDate: "",
      status: "",
      ocorrencias: []
    },
    defaultEncomenda: {
      codigoRastreio: "",
      name: "",
      postDate: "",
      status: "",
      ocorrencias: []
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nova Encomenda" : "Editar Encomenda";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.encomendas = [
        {
          codigoRastreio: "null",
          name: "null",
          postDate: "null",
          status: "null",
          ocorrencias: [
            {
              date: "null",
              time: "null",
              localState: "null",
              description: "null",
              detail: " "
            }
          ]
        },
        {
          codigoRastreio: "null",
          name: "null",
          postDate: "null",
          status: "null",
          ocorrencias: [
            {
              date: "null",
              time: "null",
              localState: "null",
              description: "null",
              detail: " "
            }
          ]
        }
      ];
    },
    editEncomenda(encomenda) {
      this.editedIndex = this.encomendas.indexOf(encomenda);
      this.editedEncomenda = Object.assign({}, encomenda);
      this.dialog = true;
    },
    deleteEncomenda(encomenda) {
      const index = this.encomendas.indexOf(encomenda);
      confirm("Você esta certo que deseja deletar a encomenda?") &&
        this.encomendas.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedEncomenda = Object.assign({}, this.defaultEncomenda);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.encomendas[this.editedIndex], this.editedEncomenda);
      } else {
        this.encomendas.push(this.editedEncomenda);
      }
      this.close();
    }
  }
};
</script>

<style scoped>
#home {
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

.v-toolbar {
  border-radius: 10px;
}

.nova-encomenda {
  height: 40px !important;
  width: 175px;

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

.v-card__text {
  padding: 0 24px 0px !important;
}

.v-card__actions .v-btn {
  height: 40px !important;
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

.linha-tempo {
  margin: auto;
  justify-items: center;
  justify-content: center;
  justify-self: center;
  align-content: center;
  align-items: center;
  align-self: center;
}
</style>
