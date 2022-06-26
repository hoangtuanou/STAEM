import React, { useState } from "react";

import SearchInput from "components/SearchInput";
import Dropdown from "components/Dropdown";
import GameCard from "components/GameCard";

import useInfinityScroll from "hooks/useInfinityScroll";

import spinnerIcon from "assets/icons/spinner.svg";

import "./styles.scss";

const TrendingList = ({ trendList, callGetTrendingList }) => {
  const [sortBy, setSortBy] = useState();
  const [isFetching] = useInfinityScroll((cb) => callGetTrendingList({ sortBy, cb }));

  const handleSelectDropdown = (e) => {
    const newSortBy = e.target.value
    setSortBy(newSortBy)
    callGetTrendingList({ sortBy: e.target.value, isUpdateLimit: false })
  };

  return (
    <div className="trending-container">
      <div className="title">
        <h2>new & trending</h2>
      </div>
      <div className="search-section">
        <SearchInput callGetTrendingList={callGetTrendingList} />
        <div className="sort-wrapper">
          <h3>sort by:</h3>
          <Dropdown handleSelectDropdown={handleSelectDropdown} />
        </div>
      </div>
      <div className="trending-list">
        {trendList.length
          ? trendList.map((gameInfo) => (
              <GameCard key={gameInfo.id} gameInfo={gameInfo} />
            ))
          : <div className="not-found">No Results</div>}
      </div>
      {isFetching ? (
        <div className="loading-icon">
          <img src={spinnerIcon} alt="loading-icon" />
        </div>
      ) : null}
    </div>
  );
};

export default TrendingList;
