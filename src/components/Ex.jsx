import React, { useEffect, useState } from 'react';

const Ex = () => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev - 1); // update every 1 second
    }, 1000);

    if (count>0){
        return () => clearInterval(interval); // cleanup on unmount

    }
    else{
        clearInterval(0)

    }
  }, []); // empty dependency array = runs once on mount

  return (
    <div className='mt-50'>
      <h2>Timer: {count} seconds</h2>
    </div>
  );
};

export default Ex;
