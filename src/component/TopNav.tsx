
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";


const TopNav = () => {


    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">My Deezer</Navbar.Brand>
            <Nav><Link to="/home">Home</Link></Nav>
            <Nav><Link to="/search">Search</Link></Nav>
      
        </Navbar>
    );
    }

export default TopNav;
