import "./App.css";
import HomePage from "./WalletConnect/WalletConnect";

function App() {
  console.log(process.env.REACT_APP_TEST);
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
