import "./App.css";

import fields from "./../data/fields.js";
import { useState } from "react";
import Step from "./components/Step/Step.jsx";

function App() {
  const [programmingFields] = useState(fields);
  const [field, setField] = useState("-1");
  const [steps, setSteps] = useState([]);

  const findFieldSteps = (newField) => {
    if (newField !== "-1") {
      const mainField = programmingFields.find(
        (field) => field.id === newField
      );

      setSteps(mainField.technologies);
    }
  };

  return (
    <>
      <div id="card">
        <div id="header">
          <h1 className="title">مسیر سبز - راهنمای مسیر شما</h1>
        </div>
        <div id="content">
          <div>
            <select
              id="select-category"
              value={field}
              onChange={(event) => {
                setField(event.target.value);
                findFieldSteps(event.target.value);
              }}
            >
              <option value="-1">لطفا فیلد مورد نظر را انتخاب نمایید</option>
              {programmingFields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.title}
                </option>
              ))}
            </select>
          </div>

          {field !== "-1" && (
            <div>
              <div className="selected-category-show">
                <span> نقشه اختصاصی شما برای </span>
                <span id="selected-roadmap-title"> {field} </span>:
              </div>
            </div>
          )}

          {/* <!-- is-empty className --> */}
          <div id="roadmap" className={field === "-1" ? "is-empty" : ""}>
            {field === "-1" ? (
              <div className="empty-list">
                <p>در ابتدا لطفا حوزه مورد نظر خود را انتخاب فرمایید</p>
              </div>
            ) : (
              steps.map((step) => <Step key={step.id} {...step} />)
            )}
          </div>
        </div>
      </div>

      <div id="background"></div>
    </>
  );
}

export default App;
