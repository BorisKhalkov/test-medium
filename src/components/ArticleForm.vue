<template>
  <div class = 'container page'>
    <div class = "row">
      <div class = "col-md-10 offset-md-1 col-xs-12">

        <mcv-validation-errors v-if = 'errors' :validation-errors='errors'/>

        <form @submit.prevent = 'onSubmit'>
          <fieldset>
            <fieldset class = "form-group">
              <input
                  class = "form-control form-control-lg" type = "text" placeholder = "Article Title"
                  v-model = 'title'
              >
            </fieldset>

            <fieldset class = "form-group">
              <input
                  class = "form-control" type = "text" placeholder = "What's this article about?"
                  v-model = 'description'
              >
            </fieldset>

            <fieldset class = "form-group">
            <textarea
                class = "form-control" rows = "8" placeholder = "Write your article (in markdown)"
                v-model = 'body'
            >
            </textarea>
            </fieldset>

            <fieldset class = "form-group">
              <input
                  class = "form-control" type = "text" placeholder = "Enter tags"
                  v-model = 'tagList'
              >
            </fieldset>

            <button
                class = "btn btn-lg pull-xs-right btn-primary" type = "submit"
                :disabled = 'isSubmitting'
            >
              Publish Article
            </button>

          </fieldset>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from "@/components/ValidationErrors";

export default {
  name: "ArticleForm",
  components: {
    McvValidationErrors,
  },

  props: {
    initValues: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      title: this.initValues.title,
      description: this.initValues.description,
      body: this.initValues.body,
      tagList: this.initValues.tagList.join(' '),
    };
  },

  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' '),
      };
      this.$emit('articleSubmit', form);
    }
  }
};
</script>

<style scoped>

</style>