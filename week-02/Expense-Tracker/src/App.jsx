import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="page">
      <header className="header">
        <div>
          <h1 className="title">Expense Tracker Application</h1>
          <p className="subtitle">week 1 & week 2 practice project</p>
        </div>
      </header>

      <Card title={"Add Expense"}>
        <p>Form will be here</p>
      </Card>

      <Card title={"Expenses"}>
        <p>List will be here</p>
      </Card>
    </div>
  );
}

export default App;
