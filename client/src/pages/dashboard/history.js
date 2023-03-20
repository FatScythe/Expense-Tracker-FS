// CSS
import "./dashboard.css";

// Component
import { StopSign, Trash } from "../../component/icons/icons";

// Context
import { useUserContext } from "../../context/userContext";
import { useUiContext } from "../../context/uiContext";

// Hooks
// import { useDelete } from "../../hooks/useFetch";

const History = (transactions) => {
  const transactionHistory = transactions.transactions;
  const { showAlert } = useUiContext();
  const { getUserFromLocalStorage } = useUserContext();

  if (transactionHistory.length === 0) {
    return (
      <>
        <h3 className='text-base text-gray-700 inline'>
          No Transactions
          <StopSign />
        </h3>
      </>
    );
  }

  const handleDelete = async (url, id = "") => {
    try {
      const response = await fetch(url + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getUserFromLocalStorage().user.token}`,
        },
      });
      const data = await response.json();

      showAlert(true, "success", data.msg);
    } catch (err) {
      console.log(err);
      showAlert(true, "danger", "unable to delete");
    }
  };

  return (
    <div className='history'>
      <h2 className='title'>
        <span>Transaction History</span>
        <button
          onClick={() => {
            handleDelete("/api/v1/trans/clear");
          }}
          className='text-xs text-gray-600 hover:text-red-500'
        >
          Clear All
        </button>
      </h2>
      {transactionHistory.map((transaction) => (
        <Item
          key={transaction._id}
          {...transaction}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const Item = ({
  _id,
  amount,
  createdAt,
  detail,
  expense,
  income,
  handleDelete,
}) => {
  let cost = amount.toString();
  if (cost.startsWith("-")) {
    cost = Number(cost.split("-")[1]);
  }

  return (
    <div className='item'>
      <h2>
        <span className='text-lg capitalize'>{detail}</span>
        <span className='text-xs font-semibold'>{createdAt}</span>
      </h2>

      <p className='gap-5'>
        {expense === 0 && (
          <span className='text-green-400 text-sm'>+ &#8358; {amount}</span>
        )}
        {income === 0 && (
          <span className='text-red-400 text-sm'>- &#8358; {cost}</span>
        )}
        <button
          onClick={() => {
            handleDelete("/api/v1/trans/", _id);
          }}
          className='rounded-full hover:bg-red-500 p-2'
        >
          <Trash />
        </button>
      </p>
    </div>
  );
};

export default History;
