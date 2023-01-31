<template>
<div>
  <ul class = "tag-list">
    <li
        class = "tag-default tag-pill tag-outline"
        v-for="tag in tags" :key='tag'
    >
      {{ tag }}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "MvcTagLists",

  props: {
    tags: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>

</style>