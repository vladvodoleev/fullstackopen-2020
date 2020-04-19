import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "UPVOTE": {
      const id = action.data.id;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.data
      );
    }
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const upvoteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const upvotedAnecdote = await anecdoteService.upvote(anecdote);
    dispatch({
      type: "UPVOTE",
      data: upvotedAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export default reducer;
