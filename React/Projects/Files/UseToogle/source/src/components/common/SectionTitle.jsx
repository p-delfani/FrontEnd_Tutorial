import React from "react";

const SectionTitle = ({ title, Buttons }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold font-IRANSansX">{title}</h2>
      </div>

      <div className="flex items-center gap-3">{Buttons}</div>
    </div>
  );
};

export default SectionTitle;
