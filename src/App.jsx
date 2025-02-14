import './App.css'
import CounterComponent from './components/CounterComponent'
import HeaderComponent from './components/HeaderComponent'
import MapComponent from './components/MapComponent'
import TimelineComponent from './components/TimelineComponent'

function App() {
 return(
    <div>
      <HeaderComponent></HeaderComponent>
    <MapComponent></MapComponent>
    <CounterComponent></CounterComponent>
    <TimelineComponent></TimelineComponent>
    </div>
 ) 
}

export default App
