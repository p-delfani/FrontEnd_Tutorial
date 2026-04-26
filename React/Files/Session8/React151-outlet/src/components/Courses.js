import React, {useState} from 'react'
import CoursesData from './../CoursesData'
import Course from './Course'

export default function Courses() {

    const [courses, setCourses] = useState(CoursesData)

    return (
        <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: 40}}>
            {courses.map(course => (
                <Course key={course.id} {...course} />
            ))}
        </div>
    )
}
