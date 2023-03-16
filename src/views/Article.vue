<template>
  <div class = "article-page">
    <div class = "banner">
      <div class = "container" v-if='article'>

        <h1>{{ article.title }}</h1>
          <div class = "article-meta">
            <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
              <img :src="article.author.image" alt='author image'>
            </router-link>

            <div class = "info">
              <router-link class = "author"
                           :to="{name: 'userProfile', params: {slug: article.author.username}}">
                {{ article.author.username }}
              </router-link>

              <span class = "date">{{ article.createdAt }}</span>
            </div>

            <span v-if = 'isAuthor'>
              <router-link class = "btn btn-outline-secondary btn-sm" :to =
                  "{name: 'editArticle', params: {slug: article.slug}}">
                <i class = "ion-edit"></i>
                Edit Article
              </router-link>

              <button class = "btn btn-outline-danger btn-sm" :class = "{disabled: false}"
                      @click='deleteArticle'>
                <i class = "ion-trash-a"></i>
                Delete Article
              </button>
            </span>

            <span v-if = '!isAuthor'>
              <button
                class = "btn btn-sm action-btn ng-binding btn-outline-secondary"
                :class = "{ 'disabled': false,
                            'btn-outline-secondary': false,
                            'btn-secondary': false }"
              >
                <i class = "ion-plus-round"></i>&nbsp;Follow {{ article.author.username }}
              </button>

              <button
                class = "btn btn-sm btn-outline-primary"
                :class = "{ 'disabled': false,
                            'btn-outline-primary': false,
                            'btn-primary': false }"
              >

                <i class = "ion-heart"></i>
                <span>Favorite Article</span>
                <span class = "counter">({{ article.favoritesCount }})</span>

              </button>
            </span>

            </div>
      </div>
    </div>


    <div class = "container page">
      <mcv-loading v-if='isLoading' />
      <mcv-error-message v-if='error' :message='error' />

      <div v-if='article'>
        <div class = "row article-content">
          <div class = "col-xs-12">
            <div>
                <p>{{ article.body }}</p>
            </div>

            <mcv-tag-list :tags='article.tagList'/>

          </div>
        </div>

<!--        Перенести в отдельный компонент-->
        <hr>

        <div class = "article-actions">
              <div class = "article-meta">
                <router-link
                    :to="{name: 'userProfile', params: {slug: article.author.username}}"
                >
                  <img :src = "article.author.image" alt='author image'>
                </router-link>

                <div class = "info">
                  <router-link
                      class = "author ng-binding"
                      :to="{name: 'userProfile', params: {slug: article.author.username}}"
                  >
                    {{ article.author.username }}
                  </router-link>
                  <span class = "date">{{ article.createdAt }}</span>
                </div>

                  <!-- If current user is the author, show edit/delete buttons -->
                  <span v-if = "isAuthor">
                    <router-link
                        class = "btn btn-outline-secondary btn-sm"
                        :to="{name: 'editArticle'}"
                    ><i class = "ion-edit"></i> Edit Article
                    </router-link>

                    <button
                        class = "btn btn-outline-danger btn-sm"
                        :class="{disabled: false}"
                        @click='deleteArticle'
                    ><i class = "ion-trash-a"></i> Delete Article
                    </button>
                  </span>

                  <!-- Otherwise, show favorite & follow buttons -->
                  <span v-else>
                    <button
                      class = "btn btn-sm action-btn btn-outline-secondary"
                      :class="{ 'disabled': false,
                            'btn-outline-secondary': false,
                            'btn-secondary': false }"
                        ><i class = "ion-plus-round"></i>
                      &nbsp;
                      Follow {{ article.author.username }}
                    </button>

                    <button
                      class = "btn btn-sm btn-outline-primary"
                      :class="{ 'disabled': false,
                            'btn-outline-primary': false,
                            'btn-primary': false }"
                      >

                      <i class = "ion-heart"></i>
                        <span>Favorite Article </span>
                        <span class = "counter">({{ article.favoritesCount }})</span>
                    </button>
                  </span>

              </div>
        </div>

        <!-- Comments section -->
        <div class = "row" v-if='currentUser'>
          <div class = "col-xs-12 col-md-8 offset-md-2">

            <div v-if="article">
              <form class = "card comment-form">
                <div class = "card-block">
                  <textarea
                      class = "form-control"
                      placeholder = "Write a comment..."
                      rows = "3"
                  ></textarea>
                </div>

                <div class = "card-footer">
                  <img
                      class = "comment-author-img"
                      :src = "currentUser.image"
                      alt='author image'
                  >
                  <button class = "btn btn-sm btn-primary" type = "submit">
                    Post Comment
                  </button>
                </div>
              </form>
            </div>

            <p v-if="!currentUser">
              <router-link :to = "{name: 'login'}">
                Sign in
              </router-link>
              or
              <router-link :to = "{name: 'register'}">
                Sign up
              </router-link>
              to add comments on this article.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {actionTypes as articleActionTypes} from '@/store/modules/article';
import {getterTypes as authGetterTypes} from '@/store/modules/auth';
import {mapState, mapGetters} from 'vuex';
import McvLoading from '@/components/Loading';
import McvErrorMessage from '@/components/ErrorMessage';
import McvTagList from '@/components/TagList'

export default {
  name: 'McvArticle',

  components: {
    McvErrorMessage,
    McvLoading,
    McvTagList,
  },

  methods: {
    deleteArticle() {
      this.$store.dispatch(articleActionTypes.deleteArticle, {slug: this.$route.params.slug})
          .then(() =>{
            this.$router.push({name: 'yourFeed'})
          })
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      article: state => state.article.data,
      error: state => state.article.error,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false;
      }
      return this.currentUser.username === this.article.author.username
    }
  },

  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, {slug: this.$route.params.slug});
  }
};
</script>

<style scoped>

</style>