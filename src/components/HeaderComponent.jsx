import "../styles/header.css"
import logo from "../../public/logo.jpg"

function HeaderComponent() {
    return (
        <div>
            <img src={logo} className="logo"></img>
        </div>
    )
}

export default HeaderComponent;