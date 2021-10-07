import './App.css';
import axios from "axios";

function App() {
    const server = 'http://localhost:3001';
    // const server = ''

    const sendRequest = async () => {
        const id = 7;
        try {
            axios.get(`${server}/button?id=${id}`).then(res => {
                console.log('res : ' + res.data.message);
            })
        } catch (err) {
            if (err) console.log(err)
        }
    }

    return (
        <div className="App">
            <button onClick={() => sendRequest()}>Click</button>
        </div>
    );
}

export default App;
