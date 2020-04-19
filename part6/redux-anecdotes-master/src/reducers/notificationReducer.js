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

let timeoutID = null;

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: "SHOW",
      data: { message },
    });

    if (timeoutID) clearTimeout(timeoutID);

    timeoutID = setTimeout(
      () =>
        dispatch({
          type: "HIDE",
        }),
      timeout * 1000
    );
  };
};

export default notificationReducer;
