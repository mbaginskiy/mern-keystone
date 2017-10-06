import keystone from 'keystone';

const Post = keystone.list('Post');

/**
 * Get All Posts
 */
export function getPosts(req, res) {
  Post.model
    .find()
    .populate('author')
    .lean()
    .exec((err, items) => {
      if (err) return res.apiError('database error', err);

      const posts = items.map((item) => {
        const { first, last } = item.author.name;
        const author = [first, last].filter(val => val).join(' ');

        return Object.assign(item, { author });
      });

      res.apiResponse({
        posts,
      });

      return false;
    });
}

/**
 * Get Post by Slug
 */
export function getPost(req, res) {
  Post.model
    .findOne({ slug: req.params.slug })
    .populate('author')
    .lean()
    .exec((err, item) => {
      if (err) return res.apiError('database error', err);
      if (!item) return res.apiError('not found');

      const { first, last } = item.author.name;
      const author = [first, last].filter(val => val).join(' ');
      const post = Object.assign(item, { author });

      res.apiResponse({
        post,
      });

      return false;
    });
}


/**
 * Create a Post
 */
export function createPost(req, res) {
  const item = new Post.model();
  const data = req.body;

  item.getUpdateHandler(req).process(data, (err) => {
    if (err) return res.apiError('error', err);

    res.apiResponse({
      post: item,
    });

    return false;
  });
}

/**
 * Update Post by ID
 */
export function updatePost(req, res) {
  Post.model.findById(req.params.id).exec((err, item) => {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    const data = req.body;

    item.getUpdateHandler(req).process(data, (processErr) => {
      if (processErr) return res.apiError('create error', processErr);

      res.apiResponse({
        post: item,
      });

      return false;
    });

    return false;
  });
}

/**
 * Delete Post by ID
 */
export function deletePost(req, res) {
  Post.model.findById(req.params.id).exec((err, item) => {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    item.remove((removeErr) => {
      if (removeErr) return res.apiError('database error', removeErr);

      return res.apiResponse({
        success: true,
      });
    });

    return false;
  });
}
