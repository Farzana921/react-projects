import { useState } from "react";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

const CATEGORIES = ["Food", "Transport", "Bills", "Shopping", "Other"];

export default function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState("");

  function submit() {
    setError("");

    const cleanTitle = title.trim();
    const numberAmount = Number(amount);

    if (!cleanTitle) {
      return setError("Title is required");
    }

    if (!Number.isFinite(numberAmount) || numberAmount <= 0) {
      return setError("Amount must be greater than 0");
    }

    onAddExpense({
      title: cleanTitle,
      amount: numberAmount,
      category,
    });

    setTitle("");
    setAmount("");
    setCategory(CATEGORIES[0]);
  }

  return (
    <div>
      <div className="row">
        <TextInput
          label="Title"
          value={title}
          onChange={setTitle}
          placeholder="e.g., Pizza"
        />

        <TextInput
          label="Amount"
          value={amount}
          onChange={setAmount}
          placeholder="e.g., 14"
        />

        <SelectInput
          label="Category"
          value={category}
          onChange={setCategory}
          options={CATEGORIES}
        />
      </div>

      {error && <div className="error">{error}</div>}

      <button className="btn primary" onClick={submit}>
        Add
      </button>
    </div>
  );
}
