import React from 'react'

const CommentsLists = ({ comments }) => {
  return (
    <>
        <h1>Comments:</h1>
        {comments.map((comment) => (
            <div className="comment" key={comment.postedBy + ': ' + comment.message}>
                <h4>{comment.postedBy}</h4>
                <p>{comment.message}</p>
            </div>
        ))}
    </>

  )
}

export default CommentsLists;