import blogService from '../services/blogs';

const INIT_BLOGS = 'INIT_BLOGS';
const ADD = 'ADD';
const LIKE = 'LIKE';
const REMOVE = 'REMOVE';

const reducer = (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.data;
    case ADD:
      return [...state, action.data];
    case LIKE: {
      const id = action.data.id;
      return state.map((blog) => (blog.id !== id ? blog : action.data));
    }
    case REMOVE: {
      const id = action.data.id;
      console.log(action.data);
      return state.filter((blog) => blog.id !== id);
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
      type: LIKE,
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

export default reducer;
