import React, { useEffect } from 'react'

export default function User(props) {



    useEffect(() => {
        console.log('User.js => Component Mount !');

        return () => {
            console.log('User.js => Component UnMount !');
        }
    }, [])

    function clickHandler(id) {
        props.onRemove(id)
    }

    return (
        <li>{props.name} <button onClick={() => clickHandler(props.id)}>Remove</button></li>
    )
}
