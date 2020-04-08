import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const { text, type } = message

  if (type === 'error' || type === 'success') {
    return (
      <div className={type}>
        {text}
      </div>
    )
  } else {
    return null
  }

}

export default Notification