const config = require('../config');
const AppError = require('../utils/AppError');

// NOTE: Replace `countArticlesInDb` and creation logic with your project's implementations.
async function countArticlesInDb() {
  // placeholder: in real app, query the DB for count
  return 0;
}

async function createArticle(data) {
  const count = await countArticlesInDb();
  if (count >= config.maxArticles) {
    throw new AppError('Article limit reached', 403);
  }
  // create article and return result (replace with actual DB call)
  return { id: 1, ...data };
}

module.exports = {
  createArticle,
};
