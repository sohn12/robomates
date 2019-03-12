import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import { setSearchField, requestRobots } from "../actions";
import { connect } from "react-redux";
import ErrorBoundary from "../components/ErrorBoundary";

class App extends Component {
  componentWillMount() {
    this.props.onRequestRobots();
  }

  render() {
    const filteredBots = this.props.robots.filter(robot => {
      return robot.name
        .toLowerCase()
        .includes(this.props.searchField.toLowerCase());
    });
    return this.props.isPending ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1>RoboFriends</h1>
        <SearchBox onSearchChange={this.props.onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredBots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => requestRobots(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
