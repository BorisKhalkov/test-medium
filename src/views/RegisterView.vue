<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">Есть логин?</router-link>
          </p>

          <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors" />

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input v-model="username" class="form-control form-control-lg" autocomplete="username" placeholder="Имя пользователя" type="text">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="email" class="form-control form-control-lg" autocomplete="email" placeholder="Эл. почта" type="email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="password" class="form-control form-control-lg" autocomplete="new-password" placeholder="Пароль" type="password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmitting"> Зарегистрироваться </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import McvValidationErrors from '@/components/ValidationErrors.vue';
import { actionTypes } from '@/store/modules/auth';


export default {
  name: 'McvRegisterView',
  components: {
    McvValidationErrors
  },

  data() {
    return {
      email: '',
      username: '',
      password: '',
    }
  },

  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    }),
  },

  methods: {
    onSubmit() {
      this.$store.dispatch(actionTypes.register, {
        email: this.email,
        username: this.username,
        password: this.password,
      })
        .then(user => {
          console.log('успешная регстрация :>> ', user);
          this.$router.push({ name: 'globalFeed' });
        })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>