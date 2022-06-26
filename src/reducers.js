import { createReducer } from "@reduxjs/toolkit";
import { ACTIONS } from "./actions";

const initState = {
  gameList: [],
  trendList: [],
  limit: 10
};

const reducers = createReducer(initState, builder => {
  builder.addCase(ACTIONS.GET_STEAM_LIST_GAME_SUCCESS, (state, action) => {
    state.gameList = action.payload;
  });

  builder.addCase(ACTIONS.GET_TRENDING_LIST_GAME_SUCCESS, (state, action) => {
    state.trendList = action.payload;
  });

  builder.addCase(ACTIONS.SET_LIMIT, (state, action) => {
    state.limit = action.payload;
  });
});

export default reducers;
