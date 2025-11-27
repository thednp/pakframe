import "./style.css";
import { add } from "pakframe";
import { Router } from "pakframe/router";

function App() {
  return Router()
}

add(document.getElementById("app")!, App());
