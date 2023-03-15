import { Trash } from "../../component/icons/icons";
import "./dashboard.css";

const History = (transactions) => {
  const transactionHistory = transactions.transactions;
  if (transactionHistory.length === 0) {
    return <h3>No Transaction history</h3>;
  }

  return (
    <div className='history'>
      <h2 className='title'>
        <span>Transaction History</span>
        <button>Clear All</button>
      </h2>
      {transactionHistory.map((transaction) => (
        <Item key={transaction._id} {...transaction} />
      ))}
    </div>
  );
};

const Item = ({
  amount,
  createdAt,
  createdBy,
  detail,
  expense,
  income,
  updatedAt,
}) => {
  let cost = amount.toString();
  if (cost.startsWith("-")) {
    cost = Number(cost.split("-")[1]);
  }
  return (
    <div className='item'>
      <h2>
        <span className='text-lg'>{detail}</span>
        <span className='text-xs font-semibold'>{createdAt}</span>
      </h2>

      <p className='gap-5'>
        {expense === 0 && (
          <span className='text-green-400 text-sm'>+ &#8358; {amount}</span>
        )}
        {income === 0 && (
          <span className='text-red-400 text-sm'>- &#8358; {cost}</span>
        )}
        <button className='rounded-full hover:bg-red-500 p-2'>
          <Trash />
        </button>
      </p>
    </div>
  );
};

export default History;
