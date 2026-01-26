import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";

function createID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function App() {
  const [expenses, setExpenses] = useState([
    { id: createID(), title: "Food", amount: 100, category: "Shopping" },
    { id: createID(), title: "Internet", amount: 200, category: "Bills" },
  ]);

  function handleAddExpense(data) {
    const newExpense = { id: createID(), ...data };
    setExpenses((prev) => [newExpense, ...prev]);
  }

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1 className="title">Expense Tracker Application</h1>
          <p className="subtitle">week 1 & week 2 practice project</p>
        </div>
      </header>

      <Card title="Add Expense">
        <ExpenseForm onAddExpense={handleAddExpense} />
      </Card>

      <Card title="Expenses">
        <ExpenseList expenses={expenses} />
      </Card>
    </div>
  );
}

export default App;
