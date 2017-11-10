import PostListPage from './modules/Post/pages/PostListPage';
import PostDetailPage from './modules/Post/pages/PostDetailPage';
import { fetchPosts, fetchPost } from './modules/Post/PostActions';

export default [
  { path: '/',
    component: PostListPage,
    exact: true,
    loadData: () => fetchPosts(),
  },
  { path: '/posts/:slug',
    component: PostDetailPage,
    loadData: match => fetchPost(match.params.slug),
  },
];
