import axios from "axios";

const kBaseUrl =
  "https://lewis-structures.purseev-api.com/lewis_structures_main";

const getMolecules = async () => {
  try {
    return await axios.get(`${kBaseUrl}/molecules/`).then((response) => {
      const formulas = response.data.molecules;
      const fiveFormulas = [];
      for (let i = 0; i < 5; ) {
        const rand_formula =
          formulas[Math.floor(Math.random() * formulas.length)];
        const chemicalFormula = rand_formula["molecular_formula"];
        if (fiveFormulas.includes(chemicalFormula)) {
          continue;
        } else {
          fiveFormulas.push(chemicalFormula);
          i++;
        }
      }

      // setMolecularFormula = chemicalFormula
      console.log("fiveFormulas are", fiveFormulas);
      return ["C2H2", "CO2", "SiNH3", "O2", "NH3"];
    });
  } catch (err) {
    console.log(err);
  }
};

const getFormulaComponents = (chemicalFormula) => {
  let formula = chemicalFormula.slice();

  const getOneComponent = () => {
    const pattern = /^[A-Z][a-z]*[0-9]*/;
    const result = pattern.exec(formula);
    return result;
  };

  let components = [];

  while (getOneComponent() != null) {
    let thisComponent = getOneComponent();
    components.push(thisComponent[0]);
    let thisComponentLength = thisComponent[0].length;
    formula = formula.slice(thisComponentLength);
  }
  return components;
};

const generateNumAtomsDict = (chemicalFormula) => {
  let formulaObj = {};
  const components = getFormulaComponents(chemicalFormula);
  for (let component of components) {
    let element;
    let numInc;
    if (component.length === 3) {
      numInc = parseInt(component[2]);
      element = component.slice(0, 2);
    } else if (component.length === 2) {
      if (isNaN(component[1])) {
        numInc = 1;
        element = component;
      } else {
        numInc = parseInt(component[1]);
        element = component.slice(0, 1);
      }
    } else if (component.length === 1) {
      numInc = 1;
      element = component[0];
    } else {
      console.log("Formula components not parsed correctly");
    }

    if (formulaObj[element] === undefined) {
      formulaObj[element] = numInc;
    } else {
      formulaObj[element] = parseInt(formulaObj[element]) + numInc;
    }
  }
  return formulaObj;
};

export { getMolecules, generateNumAtomsDict };
