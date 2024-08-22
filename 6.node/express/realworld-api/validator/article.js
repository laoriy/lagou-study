const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const { Article, Comment } = require("../model");

exports.createArticle = validate([
  body("article.title").notEmpty().withMessage("文章标题不能为空"),
  body("article.description").notEmpty().withMessage("文章摘要不能为空"),
  body("article.body").notEmpty().withMessage("文章内容不能为空"),
]);

exports.getArticle = validate([
  validate.isValidObjectId(["params"], "articleId"),
  // param('articleId').custom(async value => {
  //   if (!mongoose.isValidObjectId(value)) {
  //     // 返回一个失败状态的 Promise
  //     return Promise.reject('文章ID类型错误')

  //     // 同步：失败
  //     // throw new Error('文章ID类型错误')
  //   }
  //   // 同步：成功
  //   // return true
  // })
]);

exports.updateArticle = [
  validate([
    validate.isValidObjectId(["params"], "articleId"),
    // param('articleId').isValidObjectId()
  ]),
  async (req, res, next) => {
    const articleId = req.params.articleId;
    const article = await Article.findById(articleId);
    req.article = article;
    if (!article) {
      return res.status(404).end('not found article');
    }
    next();
  },
  async (req, res, next) => {
    if (req.user._id.toString() !== req.article.author.toString()) {
      return res.status(403).end();
    }
    next();
  },
];

exports.deleteArticle = exports.updateArticle;

exports.createArticleComment = [
  validate([
    body("comment.body").notEmpty().withMessage("评论内容不能为空"),
    validate.isValidObjectId(["params"], "articleId"),
  ]),
  async (req, res, next) => {
    const articleId = req.params.articleId;
    const article = await Article.findById(articleId);
    req.article = article;
    if (!article) {
      return res.status(404).end('not found article');
    }
    next();
  },
];
exports.getArticleComment = [
  validate([validate.isValidObjectId(["params"], "articleId")]),
  async (req, res, next) => {
    const articleId = req.params.articleId;
    const article = await Article.findById(articleId);
    req.article = article;
    if (!article) {
      return res.status(404).end('not found article');
    }
    next();
  },
];

exports.deleteArticleComment = [
  validate([
    validate.isValidObjectId(["params"], "articleId"),
    validate.isValidObjectId(["params"], "id"),
  ]),
  async (req, res, next) => {
    const articleId = req.params.articleId;
    const commentId = req.params.id;
    const article = await Article.findById(articleId);
    req.article = article;
    if (!article) {
      return res.status(404).end('not found article');
    }
    if (!article.comments.includes(commentId)) {
      article.updateOne({
        $pull: {
          comments: commentId,
        },
      });

      return res.status(404).end('not found comment');
    }
    next();
  },
  async (req, res, next) => {
    const readyToDeleteComment = await Comment.findById(req.params.id);
    if (req.user._id.toString() !== readyToDeleteComment.author.toString()) {
      return res.status(403).end();
    }
    next();
  },
];
