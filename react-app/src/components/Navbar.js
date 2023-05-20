import { Component } from "react";
import "./NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";


class Navbar extends Component {
    render() {
        return(
            <nav className="NavbarItems">
                <div className="navbar-logo">
                    <h2>News</h2>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button type="submit">Go</button>
                </div>
                <div class="nav-menu">
                    <ul className="list">
                        {MenuItems.map((item, index) => {
                        return (
                        <li key={index}> 
                            <Link className={item.cName} to={item.url}>{item.title}</Link>
                        </li>    
                        )})}
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Navbar;