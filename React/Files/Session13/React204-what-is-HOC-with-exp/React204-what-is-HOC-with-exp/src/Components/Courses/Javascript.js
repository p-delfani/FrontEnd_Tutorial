import React, { useState } from "react";
import CourseHoc from "../HOCs/CourseHoc";

function Javascript({ title, increasePrice, price }) {
  return (
    <div>
      <h3>Course Title: {title}</h3>
      <button onClick={increasePrice}>
        Increase Course Price (Price = {price})
      </button>
    </div>
  );
}

export default CourseHoc(Javascript, 'JavaScript Expert', 2_000_000);
