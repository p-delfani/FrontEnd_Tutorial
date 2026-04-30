import React from 'react'
import './Errorbox.css'

export default function ErrorBox({ msg }) {
  return (
    <div className='cms-empty-err'>
        <h1>{ msg }</h1>
    </div>
  )
}
