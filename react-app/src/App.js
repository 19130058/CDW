import {Routes, Route} from 'react-router-dom';
import './App.css';
import Entertainment from './routes/Entertainment';
import Home from './routes/Home';
import LifeStyle from './routes/LifesStyle';
import Sport from './routes/Sport';
import World from './routes/World';
import NewsDetails from './routes/NewsDetail';
import Login from './routes/Login';import Signup from './routes/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element= {<Home/>}></Route>
        <Route path='/world' element= {<World/>}></Route>
        <Route path='/sport' element= {<Sport/>}></Route>
        <Route path='/entertainment' element= {<Entertainment/>}></Route>
        <Route path='/lifestyle' element= {<LifeStyle/>}></Route>
        <Route path='/login' element= {<Login/>}></Route>
        <Route path='/signup' element= {<Signup/>}></Route>
        
        <Route path="/news/"
        element={<NewsDetails />}>
        </Route>
     
      </Routes>
    </div>
  );
}

export default App;
