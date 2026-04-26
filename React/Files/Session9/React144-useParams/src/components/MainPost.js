import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import PostsData from './../Datas'

export default function MainPost() {

    let params = useParams()
    const [posts, setPosts] = useState(PostsData)

    console.log('params:', params);

    return (
        <div>
            Main Post: {posts.find(post => post.id == params.postID).title}
        </div>
    )
}
