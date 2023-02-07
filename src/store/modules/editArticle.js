import articleApi from "@/api/article";

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
};

export const mutationTypes = {
  editArticleStart: "[editArticle] editArticleStart",
  editArticleSuccess: "[editArticle] editArticleSuccess",
  editArticleFailure: "[editArticle] editArticleFailure",

  getArticleStart: "[editArticle] getArticleStart",
  getArticleSuccess: "[editArticle] getArticleSuccess",
  getArticleFailure: "[editArticle] getArticleFailure",
};

export const actionTypes = {
  editArticle: "[editArticle] editArticle",
  getArticle: "[editArticle] getArticle",
};

const mutations = {
  [mutationTypes.editArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.editArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.editArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.editArticle](context, { slug, articleInput }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.editArticleStart);
      articleApi
        .updateArticle(slug, articleInput)
        .then((article) => {
          context.commit(mutationTypes.editArticleSuccess, article);
          resolve(article);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.editArticleFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getArticle](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart);
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
