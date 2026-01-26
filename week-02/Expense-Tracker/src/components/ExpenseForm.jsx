import { useState } from "react";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

const CATEGORIES = ["Food", "Transport", "Bills", "Shopping", "Other"];

export default function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

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

      <button className="btn primary" type="button">
        Add
      </button>
    </div>
  );
}
