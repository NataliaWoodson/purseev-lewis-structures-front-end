import "./App.css";
import axios from "axios";

const kBaseUrl = "http://127.0.0.1:8000/lewis_structures_main";

const getMolecules = async (e) => {
  e.preventDefault();
  try {
    await axios.get(`${kBaseUrl}/molecules/`).then((response) => {
      const formulas = response.data.molecules;
      // console.log(formulas.length);
      const rand_formula =
        formulas[Math.floor(Math.random() * formulas.length)];
      const chosen_formula = rand_formula["molecular_formula"];
      return chosen_formula;
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
