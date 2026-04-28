import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Question = ({ id, info, title }) => {

  const [showInfo, setShowInfo] = useState(false)

  const toggleShowInfoHandler = () => {
    setShowInfo(prevShowInfo => !prevShowInfo)
  }

  return (
    <article className='question' onClick={toggleShowInfoHandler}>
      <header>
        <h4>{title}</h4>
        <button className='btn'>
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {showInfo && <p>{info}</p>}
    </article>
  );
};

export default Question;
