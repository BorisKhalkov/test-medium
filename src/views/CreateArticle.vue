<template>
  <div class='container'>
    <mcv-article-form
        :initValues = 'initValues'
        :errors = 'validationErrors'
        :isSubmitting = 'isSubmitting'
        @articleSubmit = 'onSubmit'
    />
  </div>
</template>

<script>
import McvArticleForm from "@/components/ArticleForm";

export default {
  name: "CreateArticle",
  components: {
    McvArticleForm,
  },

  data() {
    return {
      initValues: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      validationErrors: null,
      isSubmitting: false,
    };
  },

  methods: {
    onSubmit(data) {
      console.log("Submit on create article", data);
    }
  }
};
</script>

<style scoped>

</style>