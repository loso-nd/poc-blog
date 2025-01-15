import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import articles from '../article-content'
import NotFoundPage from './NotFoundPage';
import CommentsLists from '../components/CommentsLists';
import AddCommentForm from '../components/AddCommentForm';


const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({
        upvotes: 0,
        comments: []
    });

    const { articleId } = useParams();
    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`)
            const newArticleInfo = response.data
            setArticleInfo(newArticleInfo);
        }

        loadArticleInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
  
    const article = articles.find(article => article.name === articleId)

    const addUpvote = async () => {
        const res = await axios.put(`/api/articles/${articleId}/upvote`)
        const updatedArticle = res.data;
        setArticleInfo(updatedArticle);
    }

    if (!article){
        return (
            <NotFoundPage />
        )
    }
    return (
        <>
            <div className='article-page'>
                <h1>{article.title}</h1>
                <h3>{article.name}</h3>
                <div className="upvotes-section">
                    <button onClick={addUpvote}>
                        Upvotes
                    </button>
                    <p>This article has {articleInfo.upvotes} </p>
                </div>

                {article.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                ))}
                <AddCommentForm 
                articleName={articleId}
                onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
                <CommentsLists comments={articleInfo.comments}/>
            </div>
        </>
    )
}

export default ArticlePage