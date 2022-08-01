import "./App.css";
import axios from "axios";

const kBaseUrl = "http://127.0.0.1:8000/lewis_structures_app";

const getMolecules = async (e) => {
  e.preventDefault();
  try {
    await axios.get(`${kBaseUrl}/api/`).then((response) => {
      console.log(response);
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
