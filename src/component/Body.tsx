import { Container, Stack } from "react-bootstrap";
import BottomBar from "./BottomBar";
import TopNav from "./TopNav";
import SideBar from "./SideBar";

interface BodyProps {
    navigation: Boolean;
    sidebar:Boolean;
    children: React.ReactNode |  JSX.Element | JSX.Element[] 

    bottombar: Boolean;
}

const Body = ({navigation, sidebar,children,bottombar}: BodyProps) => {
 
    return (
        <Container>
            
            <div id="horizontal-stack">

                <div id="sidebar">
                    {sidebar && <SideBar navigation={true} userprops={true} />}
                </div>

                <div id="main">
                    <div id="navbar">
                        {navigation && <TopNav />}
                    </div>
                    <div id="section">
                        {children}
                    </div>
                </div>
            </div>
           
           <div id="horizontal-stack-playing">
                {bottombar && <BottomBar />}
            </div>
        </Container>
    );
}

export default Body;

