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

export const setNotification = (message) => {
  return {
    type: "SHOW",
    data: { message },
  };
};

export const clearNotification = () => {
  return {
    type: "HIDE",
  };
};

export default notificationReducer;
