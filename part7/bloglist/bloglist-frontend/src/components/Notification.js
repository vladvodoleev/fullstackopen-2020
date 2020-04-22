import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector((state) => state.notification);
  if (message === null) {
    return null;
  }

  const { text, type } = message;

  if (type === 'error' || type === 'success') {
    return <div className={type}>{text}</div>;
  } else {
    return null;
  }
};

export default Notification;
