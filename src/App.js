import { useEffect } from "react";
import { connect } from "react-redux";

import Header from "./components/Header";
import Slider from "./components/Slider";
import TrendingList from "./components/TrendingList";

import actionCreators from "./actions";
import selectors from "./selector";

import "./App.css";

function App({ callGetGameList, callGetTrendingList, gameList, trendList }) {

  useEffect(() => {
    callGetGameList();
    callGetTrendingList({ isUpdateLimit: false });
  }, [callGetGameList, callGetTrendingList]);

  return (
    <div className="app-container">
      <Header />
      <Slider list={gameList} />
      <TrendingList trendList={trendList} callGetTrendingList={callGetTrendingList} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  gameList: selectors.getFirstFiveGames(state),
  trendList: selectors.getTrendingList(state),
});

const mapDispatchToProps = (dispatch) => ({
  callGetGameList: () => dispatch(actionCreators.fetchGameList()),
  callGetTrendingList: (params = {}) => dispatch(actionCreators.fetchTrendingList(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
