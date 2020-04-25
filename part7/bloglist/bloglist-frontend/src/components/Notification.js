import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';

const Notification = () => {
  const message = useSelector((state) => state.notification);
  if (message === null) {
    return null;
  }

  const { text, type } = message;

  if (type === 'error' || type === 'success') {
    return <Alert severity={type}>{text}</Alert>;
  } else {
    return null;
  }
};

export default Notification;
