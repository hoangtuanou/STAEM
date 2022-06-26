import { makeGetRequest } from "./api";

export const ACTIONS = {
  GET_STEAM_LIST_GAME_SUCCESS: "GET_STEAM_LIST_GAME_SUCCESS",
  GET_TRENDING_LIST_GAME_SUCCESS: "GET_TRENDING_LIST_GAME_SUCCESS",
  SET_LIMIT: "SET_LIMIT",
};

const getSteamListGameSuccess = (payload) => ({
  type: ACTIONS.GET_STEAM_LIST_GAME_SUCCESS,
  payload,
});

const getTrendingListSuccess = (payload) => ({
  type: ACTIONS.GET_TRENDING_LIST_GAME_SUCCESS,
  payload,
});

const setLimit = (payload) => ({
  type: ACTIONS.SET_LIMIT,
  payload,
});

const urlParams = (params) => new URLSearchParams(params);

const fetchGameList = () => async (dispatch) => {
  const queryParams = urlParams({
    select: "*",
    title:
      "in.(ELDEN RING,MONSTER HUNTER RISE,CHRONO CROSS: THE RADICAL DREAMERS EDITION,THE KING OF FIGHTERS XV,Neon Flash 2)",
    order: "title.asc.nullslast",
  });
  const response = await makeGetRequest(queryParams);
  dispatch(getSteamListGameSuccess(response));
};

const fetchTrendingList = ({ cb, sortBy = 'price', isUpdateLimit = true, search }) => async (dispatch, getState) => {
  const { limit } = getState();
  const newLimit = isUpdateLimit ? limit + 5 : limit;
  const queryParams = urlParams({
    select: "*",
    title: `ilike.%${search || ''}%`,
    order: `${sortBy}.asc.nullslast,title.asc.nullslast`,
    limit: newLimit,
  });
  const response = await makeGetRequest(queryParams);
  dispatch(getTrendingListSuccess(response));

  if (isUpdateLimit) {
    dispatch(setLimit(newLimit));
  }

  if (typeof cb === "function") {
    cb();
  }
};

const actionCreators = {
  getSteamListGameSuccess,
  fetchGameList,
  fetchTrendingList,
};

export default actionCreators;
