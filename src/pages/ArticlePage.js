import React from 'react'
import { useParams } from 'react-router-dom'
import articles from '../article-content'

const ArticlePage = () => {
    const { articleId } = useParams();
    const article = articles.find(article => article.name === articleId)
  return (
    <>
        <h1>{article.title}</h1>
        <h3>{article.name}</h3>
        {article.content.map(paragraph => (
            <p>{paragraph}</p>
        ))}
    </>
  )
}

export default ArticlePage