const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW":
      return action.data.message;
    case "HIDE":
      return null;
    default:
      return state;
  }
};

export const setNotification = (message, timeout) => {
  console.log(message, timeout);
  return async (dispatch) => {
    dispatch({
      type: "SHOW",
      data: { message },
    });
    setTimeout(
      () =>
        dispatch({
          type: "HIDE",
        }),
      timeout * 1000
    );
  };
};

export default notificationReducer;
