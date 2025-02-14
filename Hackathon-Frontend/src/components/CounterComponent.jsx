import "../styles/counter.css";
import friendlyTank from "../assets/friendly-tank.png";
import friendlyDrone from "../assets/friendly-Drone.png";
import friendlySoldier from "../assets/friendly-soldier.png";
import enemyTank from "../assets/enemy-tank.png";
import enemyDrone from "../assets/enemy-Drone.png";
import enemySoldier from "../assets/enemy-soldier.png";

function CounterComponent() {
  return (
    <div className="counter-container">
      <div className="friendly-counter">
        <div className="friendly-container">
          <img src={friendlyTank}></img>
          <label className="counter-friendly">5</label>
        </div>
        <div className="friendly-container">
          <img src={friendlyDrone}></img>
          <label className="counter-friendly">5</label>
        </div>
        <div className="friendly-container">
          <img src={friendlySoldier}></img>
          <label className="counter-friendly">5</label>
        </div>
      </div>
      <div className="enemy-counter">
      <div className="enemy-container">
      <img src={enemyTank}></img>
          <label className="counter-enemy">5</label>
        </div>
        <div className="enemy-container">
        <img src={enemyDrone}></img>
          <label className="counter-enemy">5</label>
        </div>
        <div className="enemy-container">
        <img src={enemySoldier}></img>
          <label className="counter-enemy">5</label>
        </div>
      </div>
    </div>
  );
}

export default CounterComponent;
