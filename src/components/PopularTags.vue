<template>
  <div>
    <mcv-loading v-if='isLoading' />
    <mcv-error-message v-if='error' />

    <div v-if="popularTags" class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
            v-for="tag in popularTags"
            :key="tag"
            :to="{name: 'tag', params: {slug: tag}}"
            class="tag-default tag-pill"
        >
          {{ tag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { actionTypes } from '@/store/modules/popularTags';
import McvLoading from '@/components/Loading';
import McvErrorMessage from '@/components/ErrorMessage';

export default {
  name: "McvPopularTags",

  components: {
    McvLoading,
    McvErrorMessage,
  },

  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      popularTags: state => state.popularTags.data,
      error: state => state.popularTags.error,
    })
  },

  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags)
  }
};
</script>

<style scoped>

</style>