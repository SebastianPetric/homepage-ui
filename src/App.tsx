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

function App() {
  const { isAuthenticated } = useAuth0();
  const [isEditActive, setIsEditActive] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsEditActive(true);
    } else setIsEditActive(false);
  }, [isAuthenticated]);

  return (
    <div className={"font-sans text-imageColor min-w-650"}>
      <div className={"flex justify-center w-full fixed top-7 z-10"}>
        <NavigationBar />
      </div>

      <div className="flex flex-col xl:flex-row w-screen">
        <aside className="xl:h-screen xl:w-1/2 mt-32 xl:mt-0 xl:sticky xl:top-0 xl:bg-imageColor">
          <Sidebar />
        </aside>

        <main className={"xl:w-1/2 flex-grow"}>
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
            <Info isEditActive={isEditActive} />
          </Element>
        </main>
      </div>
    </div>
  );
}

export default App;
