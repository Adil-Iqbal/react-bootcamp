function ActiveFriendsList(props) {
  return (
    <React.Fragment>
      <h1>Active Friends</h1>
      <ul>
        {" "}
        {props.list.map(item => (
          <li key={item}>
            <span> {item} </span>{" "}
            <button onClick={() => props.onRemoveFriend(item)}> Remove </button>{" "}
            <button onClick={() => props.onDeactivateFriend(item)}>
              {" "}
              Deactivate{" "}
            </button>{" "}
          </li>
        ))}{" "}
      </ul>
    </React.Fragment>
  );
}

function InactiveFriendsList(props) {
  return (
    <React.Fragment>
      <h1>Inactive Friends</h1>
      <ul>
        {" "}
        {props.list.map(item => (
          <li key={item}>
            <span> {item} </span>{" "}
            <button onClick={() => props.onRemoveFriend(item)}> Remove </button>{" "}
            <button onClick={() => props.onActivateFriend(item)}>
              {" "}
              Activate{" "}
            </button>
          </li>
        ))}{" "}
      </ul>
    </React.Fragment>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFriends: [],
      inactiveFriends: [],
      input: ""
    };
    this.clearAll = this.clearAll.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.deactivateFriend = this.deactivateFriend.bind(this);
    this.activateFriend = this.activateFriend.bind(this);
    console.log("-- constructor --");
  }
  componentDidMount() {
    console.log("-- component did mount --");
    window.API.fetchFriends().then(data => {
      this.setState({
        activeFriends: data.activeFriends,
        inactiveFriends: data.inactiveFriends
      });
    });
  }
  componentDidUpdate() {
    console.log("-- component did update --");
  }
  componentWillUnmount() {
    console.log("-- component will unmount --");
  }
  addFriend() {
    this.setState(currentState => {
      return {
        activeFriends: currentState.activeFriends.concat([this.state.input]),
        input: ""
      };
    });
  }
  removeFriend(name) {
    this.setState(currentState => {
      return {
        activeFriends: currentState.activeFriends.filter(
          friend => friend !== name
        ),
        inactiveFriends: currentState.inactiveFriends.filter(
          friend => friend !== name
        )
      };
    });
  }
  deactivateFriend(name) {
    this.setState(currentState => {
      return {
        activeFriends: currentState.activeFriends.filter(
          friend => friend !== name
        ),
        inactiveFriends: currentState.inactiveFriends.concat([name])
      };
    });
  }
  activateFriend(name) {
    this.setState(currentState => {
      return {
        activeFriends: currentState.activeFriends.concat([name]),
        inactiveFriends: currentState.inactiveFriends.filter(
          friend => friend !== name
        )
      };
    });
  }
  updateInput(event) {
    const VALUE = event.target.value;
    this.setState({
      input: VALUE
    });
  }
  clearAll() {
    this.setState({
      activeFriends: [],
      inactiveFriends: [],
      input: ""
    });
  }
  render() {
    console.log("-- render --");
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="New Friend"
          value={this.state.input}
          onChange={this.updateInput}
        />{" "}
        <button onClick={this.addFriend}> Submit </button> <br />
        <button onClick={this.clearAll}> Clear All </button>
        <ActiveFriendsList
          list={this.state.activeFriends}
          onRemoveFriend={this.removeFriend}
          onDeactivateFriend={this.deactivateFriend}
        />{" "}
        <InactiveFriendsList
          list={this.state.inactiveFriends}
          onRemoveFriend={this.removeFriend}
          onActivateFriend={this.activateFriend}
        />{" "}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
