<template>
  <div>
    <h1>Person ID: {{ personId }}</h1>

    <input
      type="checkbox"
      name="showHealth"
      v-model="healthVisible"
      @click="toggleShowHealth"
    />
    Show Health Data<br />

    <input
      type="checkbox"
      name="showBank"
      v-model="bankVisible"
      @click="toggleShowBank"
    />
    Show Bank Data<br />
  </div>

  <detail-section
    header="Basic data"
    :isExpanded="true"
    @toggle:expand="toggleExpand"
    id="section-basic"
  >
    <template v-slot:default>
      <div>
        <img :src="person.avatar" alt="avatar" width="75" /><br />
        <span class="a-text-bold">First Name : </span>{{ person.first_name
        }}<br />
        <span class="a-text-bold">Last Name : </span>{{ person.last_name
        }}<br />
        <span class="a-text-bold">DOB : </span>{{ person.dob }}<br />
        <span class="a-text-bold">email : </span>{{ person.email }}<br />
        <span class="a-text-bold">Gender : </span>{{ person.gender }}<br />
        <span class="a-text-bold">SSN : </span>{{ person.ssn }}<br />
        <span class="a-text-bold">Address : </span>{{ person.street_address
        }}<br />
        <span class="a-text-bold">City : </span>{{ person.city }} <br />
        <span class="a-text-bold">State : </span>{{ person.state }} <br />
        <span class="a-text-bold">Country : </span>{{ person.country }}
      </div>
      <div>
        <button @click="gotoEditBasicData" class="btn btn-primary">EDIT</button>
      </div>
    </template>
  </detail-section>

  <detail-section
    v-if="healthVisible"
    :isLoading="false"
    header="Health data"
    :isExpanded="healthExpanded"
    @toggle:expand="toggleExpand"
    id="section-health"
  >
    <template v-slot:default>
      <div>
        <span class="a-text-bold">NDC Code : </span>{{ health.ndc_code }}<br />
        <span class="a-text-bold">Name : </span>{{ health.drug_name }}<br />
        <span class="a-text-bold">Company : </span>{{ health.drug_company
        }}<br />
        <span class="a-text-bold">PROC Code : </span>{{ health.proc_code
        }}<br />
        <span class="a-text-bold">Description : </span>{{ health.desc }}
      </div>
    </template>
  </detail-section>

  <detail-section
    v-if="bankVisible"
    :isLoading="false"
    header="Bank data"
    :isExpanded="bankExpanded"
    @toggle:expand="toggleExpand"
    id="section-bank"
  >
    <template v-slot:default>
      <div>
        <span class="a-text-bold">Credit Card : </span>{{ bank.credit_card
        }}<br />
        <span class="a-text-bold">Credit Card Type : </span
        >{{ bank.credit_card_type }}<br />
        <span class="a-text-bold">IBAN : </span>{{ bank.iban }}<br />
        <span class="a-text-bold">Money : </span>{{ bank.money }}<br />
      </div>
    </template>
  </detail-section>
</template>

<script>
import { useRoute } from "vue-router";
import DetailSection from "Components/DetailSection.vue";
import usePersonService from "Services/person-service.js";
import useBankService from "Services/bank-service.js";
import useHealthService from "Services/health-service.js";
const route = useRoute();
const { getPerson } = usePersonService();
const { getBank } = useBankService();
const { getHealth } = useHealthService();

export default {
  name: "person-detail",
  computed: {
    personId() {
      return this.person.id;
    },
  },
  data() {
    return {
      // basicExpanded: false,
      healthExpanded: false,
      bankExpanded: false,
    };
  },
  methods: {
    toggleShowHealth() {
      this.healthVisible = !this.healthVisible;
    },
    toggleShowBank() {
      this.bankVisible = !this.bankVisible;
    },
    toggleExpand(id) {
      console.log("toggleExpand id:", id);
      if (id === "section-basic") {
        this.basicExpanded = !this.basicExpanded;
      }
      if (id === "section-bank") {
        this.bankExpanded = !this.bankExpanded;
      }
      if (id === "section-health") {
        this.healthExpanded = !this.healthExpanded;
      }
    },
    async routeChanged() {
      if (this.$route.name == "PersonDetail") {
        const id = this.$route.params.id;
        await this.load(id);
      }
    },
    async load(id) {
      this.person = await getPerson(id);

      if (this.healthVisible) {
        this.health = await getHealth(id);
      }

      if (this.bankVisible) {
        this.bank = await getBank(id);
      }
    },
    gotoEditBasicData() {
      this.$router.push({ path: `/person/edit/${this.person.id}` });
    },
  },
  data() {
    return {
      person: Object,
      bank: Object,
      health: Object,
      healthVisible: true,
      healthExpanded: false,
      bankVisible: true,
      bankExpanded: false,
    };
  },
  components: {
    DetailSection,
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.load(id);
  },
  watch: {
    $route() {
      this.routeChanged();
    },
  },
};
</script>

// todo: where/how to share styles?
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.a-text-bold {
  font-weight: 700 !important;
}

.btn {
  margin: 2px 5px 0 0;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>
