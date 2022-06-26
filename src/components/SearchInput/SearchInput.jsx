import React from "react";

import Utils from 'utils';

import './styles.scss';

const SearchInput = ({ callGetTrendingList }) => {
  const handleChangeText = Utils.debounce(({ target: { value } }) => {
    callGetTrendingList({ isUpdateLimit: false, search: value })
  }, 500);

  return (
    <div className="search-wrapper">
      <input type="text" className="search-input" placeholder="Search" onChange={handleChangeText} />
    </div>
  );
};

export default SearchInput;
