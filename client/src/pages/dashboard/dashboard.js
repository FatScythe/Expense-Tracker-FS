import "./dashboard.css";

// Components
import { Arrow, EyeClose, EyeOpen } from "../../component/icons/icons";
import History from "./history";

// Hooks
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

// Context
import { useUiContext } from "../../context/uiContext";
import { useUserContext } from "../../context/userContext";

const Dashboard = () => {
  const { data, pending, error } = useFetch(
    "http://localhost:5000/api/v1/trans"
  );

  if (pending) {
    return (
      <h2 className='max-w-full md:max-w-md mx-auto text-black mt-48 text-center text-xl animate-pulse'>
        Loading...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className='max-w-full md:max-w-md mx-auto mt-48 text-center text-red-600 text-lg'>
        Something is wrong, we are currently fixing it, or check internet
        connection
      </h2>
    );
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
  const { showAlert } = useUiContext();
  const [values, setValues] = useState({
    detail: "",
    amount: 0,
  });
  const { getUserFromLocalStorage } = useUserContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { detail, amount } = values;
      if (!detail || !amount) {
        showAlert(true, "danger", "Please provide detail and amount");
        return;
      }

      const response = await fetch("http://localhost:5000/api/v1/trans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserFromLocalStorage().user.token}`,
        },
        body: JSON.stringify({
          detail: values.detail,
          amount: Number(values.amount),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert(true, "danger", data.msg);
        return;
      }

      showAlert(true, "success", "Added new transaction");
    } catch (error) {
      showAlert(true, "danger", "Unable to add new transaction");
      console.log(error);
    }
  };
  return (
    <form className='input text-black'>
      <div className='name'>
        <label htmlFor='name'>NAME</label>
        <input
          type='text'
          onChange={(e) => setValues({ ...values, detail: e.target.value })}
          value={values.detail}
        />
      </div>

      <div className='amount'>
        <label htmlFor='amount'>AMOUNT</label>
        <input
          type='number'
          onChange={(e) => setValues({ ...values, amount: e.target.value })}
          value={values.amount}
        />
      </div>

      <button onClick={handleSubmit}>ADD</button>
    </form>
  );
};

export default Dashboard;
