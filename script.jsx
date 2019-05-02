function FriendsList(props) {
    return (
        <ul>
            {props
                .list
                .map((item) => (
                    <li key={item}>
                        <span>{item}</span>
                        <button onClick={() => props.onRemoveFriend(item)}>Remove</button>
                    </li>
                ))}
        </ul>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [
                "Abid", "Adil", "Asim"
            ],
            input: ""
        }
        this.addFriend = this
            .addFriend
            .bind(this);
        this.removeFriend = this
            .removeFriend
            .bind(this);
        this.updateInput = this
            .updateInput
            .bind(this);
    }
    addFriend() {
        this.setState(currentState => {
            return {
                friends: currentState
                    .friends
                    .concat([this.state.input]),
                input: ""
            }
        });
    }
    removeFriend(name) {
        this.setState((currentState) => {
            return {
                friends: currentState
                    .friends
                    .filter(friend => friend !== name)
            }
        })
    }
    updateInput(event) {
        const VALUE = event.target.value;
        this.setState({input: VALUE});
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="New Friend"
                    value={this.state.input}
                    onChange={this.updateInput}></input>
                <button onClick={this.addFriend}>Submit</button>
                <FriendsList list={this.state.friends} onRemoveFriend={this.removeFriend}/>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById('app'));