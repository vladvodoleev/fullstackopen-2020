import blogService from '../services/blogs';

const INIT_BLOGS = 'INIT_BLOGS';
const ADD = 'ADD';
const REMOVE = 'REMOVE';
const UPDATE_BLOG = 'UPDATE_BLOG';

const reducer = (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.data;
    case ADD:
      return [...state, action.data];
    case REMOVE: {
      const id = action.data.id;
      return state.filter((blog) => blog.id !== id);
    }
    case UPDATE_BLOG: {
      const id = action.data.id;
      return state.map((blog) => (blog.id !== id ? blog : action.data));
    }
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: INIT_BLOGS,
      data: blogs,
    });
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    const addedBlog = await blogService.create(blog);
    dispatch({
      type: ADD,
      data: addedBlog,
    });
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const updateBlog = await blogService.updateBlog(blog);
    dispatch({
      type: UPDATE_BLOG,
      data: updateBlog,
    });
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id);
    dispatch({
      type: REMOVE,
      data: blog,
    });
  };
};

export const commentBlog = (comment, id) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.addComment(comment, id);
    dispatch({
      type: UPDATE_BLOG,
      data: commentedBlog,
    });
  };
};

export default reducer;
