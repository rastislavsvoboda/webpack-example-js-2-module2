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

    <detail-section header="Basic data">
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
import DetailSection from "Components/DetailSection.vue";

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
  },
  data() {
    return {
      person: {
        id: 1,
        first_name: "Leesa",
        last_name: "Cokayne",
        avatar:
          "https://robohash.org/hicnihilcupiditate.png?size=50x50&set=set1",
        gender: "Male",
        ssn: "393-28-1313",
        city: "Laju Kidul",
        country: "Indonesia",
        state: null,
        street_address: "09 Evergreen Park",
        dob: "1989-10-13",
        email: "lcokayne0@google.it",
      },
      bank: {
        id: 1,
        credit_card: "5610825603858656",
        credit_card_type: "bankcard",
        iban: "FO84 9796 8046 0012 69",
        money: "€9466,75",
      },
      health: {
        id: 1,
        drug_company: "Teva Select Brands",
        drug_name: "Adderall",
        ndc_code: "57844-130",
        desc: "Other x-ray of epididymis and vas deferens",
        proc_code: "8795",
      },
      healthVisible: true,
      bankVisible: true,
      healthExpanded: false,
      bankExpanded: false,
    };
  },
  components: {
    DetailSection,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
