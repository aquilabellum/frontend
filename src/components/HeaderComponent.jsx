import "../styles/header.css"
import logo from "../../public/logo.jpg"

function HeaderComponent() {
    return (
        <div>
            <img src={logo} className="logo"></img>
            <div className="region-section">
                <div className="region">
                    HQ
                </div>
                <div className="region">
                    Grey Zone
                </div>
                <div className="region">
                    Frontline
                </div>
                <div className="region">
                    Zone 1
                </div>
                <div className="region">
                    Zone 2
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent;