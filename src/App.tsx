import "./App.scss";
import { HEADLINE_TEXT } from "@/globals/constants/constants.ts";
import Headline from "@/components/atoms/Headline/Headline.tsx";

function App() {
  return (
    <div className="app">
      <Headline title={HEADLINE_TEXT} />
    </div>
  );
}

export default App;
