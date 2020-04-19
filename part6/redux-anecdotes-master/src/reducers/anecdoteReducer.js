// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "UPVOTE": {
      const id = action.data.id;
      const anecdoteToUpvote = state.find((n) => n.id === id);
      const upvotedAnecdote = {
        ...anecdoteToUpvote,
        votes: ++anecdoteToUpvote.votes,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : upvotedAnecdote
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

export const upvoteAnecdote = (id) => {
  return {
    type: "UPVOTE",
    data: { id },
  };
};

export const initializeAnecdotes = (data) => {
  return {
    type: "INIT_ANECDOTES",
    data,
  };
};

export const createAnecdote = (data) => {
  return {
    type: "NEW_ANECDOTE",
    data,
  };
};

export default reducer;
