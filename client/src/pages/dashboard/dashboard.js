import "./dashboard.css";

// Components
import { Arrow, EyeClose, EyeOpen } from "../../component/icons/icons";
import History from "./history";

// Hooks
import useFetch from "../../hooks/useFetch";

// Context
// import { useUiContext } from "../../context/uiContext";
// import { useUserContext } from "../../context/userContext";

const Dashboard = () => {
  const { data, pending, error } = useFetch(
    "http://localhost:5000/api/v1/trans"
  );

  // console.log({ data, pending, error }, "dashboard");
  if (pending) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>Something is wrong, we are currently fixing it</h2>;
  }

  const { balance, expense, income, transactions } = data;
  return (
    <>
      <main className='dashboard'>
        <div className='stats'>
          <div className='balance'>
            <h3>Total balance</h3>
            <div className='cash'>
              <p>&#8358; {balance}</p>
              <button>{true ? <EyeClose /> : <EyeOpen />}</button>
            </div>
          </div>
          <div className='inc-exp'>
            <div className='inc'>
              <h3>
                <span>
                  <Arrow />
                </span>
                Income
              </h3>
              <h2>&#8358; {income}</h2>
            </div>
            <div className='exp'>
              <h3>
                <span>
                  <Arrow />
                </span>
                Expense
              </h3>
              <h2>&#8358; {expense}</h2>
            </div>
          </div>
        </div>

        <History transactions={transactions} />
        <Input />
      </main>
    </>
  );
};

const Input = () => {
  return (
    <form className='input text-black'>
      <div className='name'>
        <label htmlFor='name'>NAME</label>
        <input type='text' />
      </div>

      <div className='amount'>
        <label htmlFor='amount'>AMOUNT</label>
        <input type='number' />
      </div>

      <div className='date'>
        <label htmlFor='date'>DATE</label>
        <input type='date' />
      </div>

      <button>ADD</button>
    </form>
  );
};

export default Dashboard;
