import { createSelector } from "@reduxjs/toolkit";

const selectSelf = (state) => state;

const gameListSelectors = createSelector(selectSelf, (state) => state.gameList);

const getFirstFiveGames = createSelector(selectSelf, (state) => state.gameList.slice(0, 5));

const getTrendingList = createSelector(selectSelf, (state) => state.trendList);

const selectors = {
  gameListSelectors,
  getFirstFiveGames,
  getTrendingList
};

export default selectors;
