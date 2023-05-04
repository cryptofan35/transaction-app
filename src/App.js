import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ParentTable from "./pages/ParentTable";

function App() {
  return (
    <div>
      <div className="container">
        <h1>Test Project</h1>
      </div>
      <br />
      <ParentTable />
    </div>
  );
}

export default App;
