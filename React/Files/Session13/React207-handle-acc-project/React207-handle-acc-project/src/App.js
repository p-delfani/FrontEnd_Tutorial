import React, { useState } from 'react';
import Question from './Components/Question';
import data from './data'

function App() {

  const [infos, setInfos] = useState(data)
  
  return (
    <main>
      <div className='container'>
        <h3>questions and answers about login</h3>
        <section className='info'>
          {
            infos.map(info => (
              <Question key={info.id} {...info} />
            ))
          }
        </section>
      </div>
    </main>
  );
}

export default App;
