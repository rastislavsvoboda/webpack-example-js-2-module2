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

  <detail-section header="Basic data" :isExpanded="true">
    <template v-slot:default>
      <div>
        <img :src="person.avatar" alt="avatar" width="75" /><br />
        First Name: {{ person.first_name }}<br />
        Last Name: {{ person.last_name }}<br />
        DOB: {{ person.dob }}<br />
        email: {{ person.email }}<br />
        Gender: {{ person.gender }}<br />
        SSN: {{ person.ssn }}<br />
        Address: {{ person.street_address }}<br />
        City: {{ person.city }} <br />
        State: {{ person.state }} <br />
        Country: {{ person.country }}
      </div>
    </template>
  </detail-section>

  <detail-section v-if="healthVisible" :isLoading="false" header="Health data">
    <template v-slot:default>
      <div>
        NDC Code: {{ health.ndc_code }}<br />
        Name: {{ health.drug_name }}<br />
        Company: {{ health.drug_company }}<br />
        PROC Code: {{ health.proc_code }}<br />
        Description: {{ health.desc }}
      </div>
    </template>
  </detail-section>

  <detail-section v-if="bankVisible" :isLoading="false" header="Bank data">
    <template v-slot:default>
      <div>
        Credit Card: {{ bank.credit_card }}<br />
        Credit Card Type: {{ bank.credit_card_type }}<br />
        IBAN: {{ bank.iban }}<br />
        Money: {{ bank.money }}<br />
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
  methods: {
    toggleShowHealth() {
      this.healthVisible = !this.healthVisible;
    },
    toggleShowBank() {
      this.bankVisible = !this.bankVisible;
    },
    async doSomething() {
      // console.log("in do something");

      if (this.$route.name == "PersonDetail") {
        // console.log(this.$route.params.id);

        const id = this.$route.params.id;
        await this.load(id);
      } else {
        // console.log("other that PersonDetail page");
      }

      // console.log(this.$route);
    },
    async load(id) {
      this.person = await getPerson(id);

      this.bank = await getBank(id);

      this.health = await getHealth(id);
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
      this.doSomething();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
