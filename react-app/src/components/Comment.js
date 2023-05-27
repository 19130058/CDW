import React from 'react';

const Comment = ({ author, content }) => {
  return (
    <div>
      <h3>{author}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Comment;