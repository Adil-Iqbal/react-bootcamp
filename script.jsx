function deepCopy(data) {
  return JSON.parse(JSON.stringify(data));
}

function ActiveFriendsList(props) {
  return (
    <div>
      {" "}
      <h3> Active Friends </h3>{" "}
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
    </div>
  );
}

function InactiveFriendsList(props) {
  return (
    <div>
      <h3> Active Friends </h3>{" "}
      <ul>
        {" "}
        {props.list.map(item => (
          <li key={item}>
            <span> {item} </span>{" "}
            <button onClick={() => props.onRemoveFriend(item)}> Remove </button>{" "}
            <button onClick={props.onDeactivateFriend(item)}>
              {" "}
              Deactivate{" "}
            </button>{" "}
          </li>
        ))}{" "}
      </ul>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFriends: ["Abid", "Adil", "Asim"],
      inactiveFriends: [],
      input: ""
    };
    this.addFriend = this.addFriend.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.deactivateFriend = this.deactivateFriend.bind(this);
  }
  addFriend() {
    this.setState(currentState => {
      return {
        activeFriends: currentState.friends.concat([this.state.input]),
        input: ""
      };
    });
  }
  removeFriend(name) {
    this.setState(currentState => {
      return {
        activeFriends: currentState.friends.filter(friend => friend !== name)
      };
    });
  }
  deactivateFriend(name) {
    let newState = {
      activeFriends: deepCopy(this.state.activeFriends),
      inactiveFriends: deepCopy(this.state.inactiveFriends)
    };
    newState.activeFriends.filter(friend => friend !== name);
    newState.inactiveFriends.push(name);
    this.setState(newState);
  }
  updateInput(event) {
    const VALUE = event.target.value;
    this.setState({
      input: VALUE
    });
  }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="New Friend"
          value={this.state.input}
          onChange={this.updateInput}
        >
          {" "}
        </input>{" "}
        <button onClick={this.addFriend}> Submit </button>{" "}
        <ActiveFriendsList
          list={this.state.activeFriends}
          onRemoveFriend={this.removeFriend}
        />{" "}
        <InactiveFriendsList
          list={this.state.inactiveFriends}
          onDeactivateFriend={this.deactivateFriend}
        />{" "}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
