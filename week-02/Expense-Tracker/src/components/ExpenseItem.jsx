export default function ExpenseItem (expense){
    return (
        <li className="Item">
            <div>
                <div className="ItemTitle">
                    {ExpenseTitle}
                </div>
                <div className="ItemMeta">
                    {Expense.cryptogroy}
                </div>
                <div className="amount">
                    ${Expense.amount}
                </div>
            </div>
        </li>
    )
}