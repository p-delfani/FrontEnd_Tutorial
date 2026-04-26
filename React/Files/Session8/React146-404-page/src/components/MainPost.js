import React, { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import PostsData from './../Datas'

export default function MainPost() {

    let params = useParams()
    const [posts, setPosts] = useState(PostsData)

    let hasPost = posts.some(post => post.id == params.postID)

    console.log(hasPost);

    return (
        <div>
            {!hasPost ? (
                <Navigate to="/" />
            ) :
                (
                    <>
                        Main Post : {posts.find(post => post.id == params.postID).title}
                    </>

                )
            }
        </div >
    )
}
