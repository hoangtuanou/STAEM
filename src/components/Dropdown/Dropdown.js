import React from "react";

import arrowdownIcon from "assets/icons/arrow-down.svg";

import "./styles.scss";

function Dropdown({ handleSelectDropdown }) {
  return (
    <div className="dropdown">
      <select onChange={handleSelectDropdown}>
        <option value="price">price</option>
        <option value="title">name</option>
      </select>
      <img src={arrowdownIcon} alt="arrow-down" />
    </div>
  );
}

export default Dropdown;
