import logo from './logo.svg';
import './App.css';
import Nav from './Componunts/NavBar/Nav';
import Home from './Componunts/Home/Home';
import { Route,Routes,Navigate,HashRouter ,BrowserRouter} from 'react-router-dom';
import Mycart from './Componunts/Mycart/Mycart';
import BastSeller from './Componunts/BastSeller/BastSeller';
import SearchIteam from './Componunts/SearchIteam/SearchIteam';
import Pyment from './Componunts/Pyment/Pyment';
import Myorders from './Componunts/Myorders/Myorders';



function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Home to='/' />} />

          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Mycart/>}/>
          <Route path='/Myorders' element={<Myorders />} />
          {/* <Route path='/BastSeller' element={<BastSeller />} /> */}
          <Route path='/SearchIteam' element={<SearchIteam />} />
          <Route path='/Payment' element={<Pyment />} />

        </Routes>


      </BrowserRouter>
      
    </div>
  );
}

export default App;
