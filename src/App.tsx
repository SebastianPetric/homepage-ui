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
    <div className={"font-sans text-imageColor w-full"}>
      <div className={"flex justify-center"}>
        <NavigationBar />
      </div>
      <div className="flex">
        <aside className="h-screen w-1/2 sticky top-0 bg-imageColor h-1/3">
          <Sidebar />
        </aside>

        <main className={"w-1/2 flex-grow"}>
          <Element name={"greeting-scroll"} className={"tile"}>
            <Greeting isEditActive={isEditActive} />
          </Element>
          <Element name={"aboutme-scroll"} className={"tile"}>
            <AboutMe isEditActive={isEditActive} />
          </Element>
          <Element name={"career-scroll"} className={"tile"}>
            <Career isEditActive={isEditActive} />
          </Element>
          <Element name={"academic-scroll"} className={"tile"}>
            <Academic isEditActive={isEditActive} />
          </Element>
          <Element name={"info-scroll"} className={"tile"}>
            <Info isEditActive={isEditActive} />
          </Element>
        </main>
      </div>
    </div>
  );
}

export default App;
