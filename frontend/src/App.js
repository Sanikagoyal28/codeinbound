import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome";
import Rating from "./components/rating";

function App() {
  var email = localStorage.getItem("email")
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Welcome />} />
        {email ? <Route path="/rating" exact element={<Rating />} /> : null}
      </Routes>
    </BrowserRouter>

  </>
}

export default App;
