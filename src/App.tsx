import "./App.css";
import NavigationBar from "./navigation/NavigationBar";
import Sidebar from "./sidebar/Sidebar";
import Greeting from "./covering-letter/Greeting";
import AboutMe from "./experiences/AboutMe";
import Career from "./career/Career";
import Academic from "./academic/Academic";
import Info from "./user/Info";
import { Element } from "react-scroll";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export enum ENDPOINT {
  COVERING_LETTER = "covering-letter",
  ACADEMIC = "academic",
  CAREER = "career",
  EXPERIENCES = "experiences",
  SEND = "send",
  USERS = "users",
}

function App() {
  const { isAuthenticated } = useAuth0();
  const [isEditActive, setIsEditActive] = useState<boolean>(false);
  const [shouldHighlightCveInput, setShouldHighlightCveInput] =
    useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsEditActive(true);
    } else setIsEditActive(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (shouldHighlightCveInput)
      setTimeout(() => {
        setShouldHighlightCveInput(false);
      }, 2000);
  }, [shouldHighlightCveInput]);

  return (
    <div className={"font-sans text-imageColor min-w-650"}>
      <NavigationBar onClickHighlightCveInput={setShouldHighlightCveInput} />
      <div className="flex flex-col xl:flex-row w-screen">
        <aside className="h-screen xl:w-1/2 xl:mt-0 xl:sticky xl:top-0 bg-imageColor">
          <Sidebar />
        </aside>

        <main className={"w-screen xl:w-1/2 flex-grow"}>
          <Element name={"greeting-scroll"} className={"first-tile"}>
            <Greeting isEditActive={isEditActive} />
          </Element>
          <Element name={"aboutme-scroll"} className={"normal-tile"}>
            <AboutMe isEditActive={isEditActive} />
          </Element>
          <Element name={"career-scroll"} className={"normal-tile"}>
            <Career isEditActive={isEditActive} />
          </Element>
          <Element name={"academic-scroll"} className={"normal-tile"}>
            <Academic isEditActive={isEditActive} />
          </Element>
          <Element name={"info-scroll"} className={"normal-tile"}>
            <Info
              isEditActive={isEditActive}
              shouldHighlightCveInput={shouldHighlightCveInput}
            />
          </Element>
        </main>
      </div>
    </div>
  );
}

export default App;
