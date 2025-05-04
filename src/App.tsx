import "./App.scss";
import { HEADLINE_TEXT } from "@/globals/constants/constants.ts";
import Headline from "@/components/atoms/Headline/Headline.tsx";
import PasswordContainer from "@/components/container/PasswordContainer/PasswordContainer.tsx";
import ContentContainer from "@/components/container/ContentContainer/ContentContainer.tsx";
import Footer from "@/components/atoms/Footer/Footer.tsx";

function App() {
  return (
    <div className="app">
      <Headline title={HEADLINE_TEXT} />
      <PasswordContainer />
      <ContentContainer />
      <Footer />
    </div>
  );
}

export default App;
