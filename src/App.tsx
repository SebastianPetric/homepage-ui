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

export enum ENDPOINT {
  COVERING_LETTER = "covering-letter",
  ACADEMIC = "academic",
  CAREER = "career",
  EXPERIENCES = "experiences",
  SEND = "send",
  USERS = "users",
}

function App() {
  const [shouldHighlightCveInput, setShouldHighlightCveInput] =
    useState<boolean>(false);

  useEffect(() => {
    if (shouldHighlightCveInput)
      setTimeout(() => {
        setShouldHighlightCveInput(false);
      }, 2000);
  }, [shouldHighlightCveInput]);

  return (
    <div className={"font-sans text-textColor min-w-650"}>
      <NavigationBar onClickHighlightCveInput={setShouldHighlightCveInput} />
      <div className="flex flex-col xl:flex-row w-screen">
        <aside className="h-screen xl:w-1/2 xl:mt-0 xl:sticky xl:top-0 bg-imageColor">
          <Sidebar />
        </aside>

        <main className={"w-screen xl:w-1/2 flex-grow"}>
          <Element name={"greeting-scroll"} className={"first-tile"}>
            <Greeting />
          </Element>
          <Element name={"aboutme-scroll"} className={"normal-tile"}>
            <AboutMe />
          </Element>
          <Element name={"career-scroll"} className={"normal-tile"}>
            <Career />
          </Element>
          <Element name={"academic-scroll"} className={"normal-tile"}>
            <Academic />
          </Element>
          <Element name={"info-scroll"} className={"normal-tile"}>
            <Info shouldHighlightCveInput={shouldHighlightCveInput} />
          </Element>
        </main>
      </div>
    </div>
  );
}

export default App;
