<template>
  <div @click="toggleExpand" class="section-button">
    <h3 :class="{ 'collapsed-button': !isExpanded }">{{ header }}</h3>
  </div>
  <div :class="{ collapsed: !isExpanded }">
    <div v-if="isLoading">Loading...</div>
    <div v-if="!isLoading" class="detail">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailSection",

  props: {
    id: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    isExpanded: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["toggle:expand"],
  methods: {
    toggleExpand() {
      this.$emit("toggle:expand", this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  //   padding: 0 1em;
  text-align: left;
}

div {
  padding: 0.5em 1em;
  text-align: left;
}

.section-button {
  border: 0;
  background: none;
  padding: 0;
  text-align: left;
}

.collapsed-button {
  border-bottom: 1px solid gray;
  padding: 0 0 10px 0;
}

.detail {
  background: white;
  border-radius: 25px;
  padding: 2rem;
  line-height: 1.5rem;
}

.collapsed {
  display: none;
}
</style>
