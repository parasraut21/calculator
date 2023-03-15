import './App.css'
import Calculator from './components/calculator/Keypad'
import CBFLogo from './assets/logo-grey-yellow.png'

function App() {
  return (
    <div className="App">
      <Calculator />
      <div className='provider'>
        <span>powered by </span>
        <img className='logo' src={CBFLogo}></img>
      </div>
      
    </div>
  )
}

export default App
/*to do :
fix sqr and sqrt
testing
floating calcval
make so text cant go past window size 
fix naming
make more modular
clear things up

*/