import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import withShowToggle from './HOCs/withShowToggle';

const Question = ({ id, info, title, showInfo, toggleShowInfoHandler }) => {
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

export default withShowToggle(Question);
