import SubmitButton from "./SubmitButton";
import NextMoleculeButton from "./NextMoleculeButton";
import StartGameButton from "./StartGameButton";

const Buttons = () => {
  return (
    <div>
      <NextMoleculeButton className="show" />
      <SubmitButton className="show" />
      <StartGameButton className="hide" />
    </div>
  );
};

export default Buttons;
