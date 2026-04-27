import React, {useState, useEffect} from 'react'

export default function useUpdateLogger(value) {

  useEffect(() => {
    console.log(value)
  }, [value])
}
