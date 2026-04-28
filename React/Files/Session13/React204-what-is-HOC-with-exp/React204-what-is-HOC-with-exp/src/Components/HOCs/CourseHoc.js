import React, { useState } from "react";

function CourseHoc(OriginalComponent, courseTitle, coursePrice) {
  function NewComponent() {
    const [title, setTitle] = useState(courseTitle);
    const [price, setPrice] = useState(coursePrice);

    const increasePrice = () => {
      setPrice((prevPrice) => prevPrice * 2);
    };

    return <OriginalComponent title={title} increasePrice={increasePrice} price={price} />;
  }

  return NewComponent;
}

export default CourseHoc;
