import './App.css'
import NavigationBar from "./navigation/NavigationBar";
import Sidebar from "./sidebar/Sidebar";
import Greeting from "./covering-letter/Greeting";
import AboutMe from "./experiences/AboutMe";
import Career from "./career/Career";
import Academic from "./academic/Academic";
import Info from "./user/Info";
import {Element} from "react-scroll";


function App() {
    return (
        <div className={"min-w-1200 font-sans text-imageColor"}>
            <NavigationBar/>
            <div className="flex">
                <aside className="h-screen w-1/2 sticky top-0 bg-imageColor">
                    <Sidebar/>
                </aside>

                <main className={"w-1/2 flex-grow"}>
                    <Element name={"greeting-scroll"} className={"tile"}>
                        <Greeting/>
                    </Element>
                    <Element name={"aboutme-scroll"}
                             className={"flex items-center justify-start pl-20 pt-40 pb-40 h-auto w-full border-b-2"}>
                        <AboutMe/>
                    </Element>
                    <Element name={"career-scroll"} className={"tile"}>
                        <Career/>
                    </Element>
                    <Element name={"academic-scroll"} className={"tile"}>
                        <Academic/>
                    </Element>
                    <Element name={"info-scroll"} className={"tile"}>
                        <Info/>
                    </Element>
                </main>
            </div>
        </div>
    );
}


export default App;
