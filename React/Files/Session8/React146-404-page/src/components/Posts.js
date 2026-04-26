import React, { useState } from 'react'
import PostsData from './../Datas'
import { Link } from 'react-router-dom'

export default function Posts() {

    const [posts, setPosts] = useState(PostsData)

    return (
        <div>
            {posts.map(post => (
                <>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                    <hr />
                </>
            ))}
        </div>
    )
}
