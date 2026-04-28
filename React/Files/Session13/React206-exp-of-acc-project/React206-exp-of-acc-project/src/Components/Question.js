import React, { useState } from 'react';

// + or - icons
// import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Question = () => {
  return (
    <article className='question'>
      <header>
        {/* <h4>{show title here}</h4> */}
        <button className='btn'>
          {/* {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />} */}
        </button>
      </header>
      {/* {showInfo && <p>{show data here}</p>} */}
    </article>
  );
};

export default Question;
