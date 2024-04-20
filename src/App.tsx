import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import {Preview} from "./pages/preview/Preview.tsx";
import {NotFound} from "./components/NotFound.tsx";

function App() {

  return (
    <BrowserRouter basename="/pda-tools">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/preview' element={<Preview/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );

}

export default App
