import './App.css'
import CBFLogo from './assets/logo-grey-yellow.png'
import Calculator from './components/calculator/Calculator'

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

testing
history
make sqrt more left
make it so it shows answer
make more modular
clear things up

*/