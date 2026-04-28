import React, { useState } from "react";
import withToggle from "./HOCs/withToggle";

function ToggleNoteList({ isShow, toggleHandler }) {
  

  return (
    <div>
      <button onClick={toggleHandler} className="btn btn-primary mt-5">
        {
            isShow ? '-' : '+'
        }
      </button>

      {isShow && (
        <form action="#" className="form">
          <div className="form-group">
            <label htmlFor="Add New Node"></label>
            <input type="text" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Add New Note
          </button>
        </form>
      )}
    </div>
  );
}

export default withToggle(ToggleNoteList);
