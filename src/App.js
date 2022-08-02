import "./App.css";
import axios from "axios";

const kBaseUrl = "http://127.0.0.1:8000/lewis_structures_main";

const getMolecules = async () => {
  try {
    await axios.get(`${kBaseUrl}/molecules/`).then((response) => {
      console.log(response.data);
    });
  } catch (err) {
    console.log(err);
  }
};

function App() {
  return (
    <section>
      <input type="submit" value="new-molecules" onClick={getMolecules}></input>
    </section>
  );
}

export default App;
