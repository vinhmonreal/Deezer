import { Nav } from "react-bootstrap";

interface SideBarProps {
    navigation: Boolean;
    userprops: Boolean;
}
export default function SideBar({ navigation, userprops }: SideBarProps) {
    return (
        <div id="navigation">
            <a href="/">Home</a>
            <a href="/search">Search</a>
        </div>


    )
}
