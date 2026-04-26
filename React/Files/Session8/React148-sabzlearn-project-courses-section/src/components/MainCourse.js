import React from 'react'
import { useParams } from 'react-router-dom'

export default function MainCourse() {

    let params = useParams()

    console.log(params.courseID);

    return (
        <div>
            
        </div>
    )
}
