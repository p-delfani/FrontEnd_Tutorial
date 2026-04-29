import React from 'react'
import ReactDOM from 'react-dom'

export default function Test() {
  return ReactDOM.createPortal(
    <h1>Test Component</h1>,
    document.getElementById('test-wrapper')
  )
}
