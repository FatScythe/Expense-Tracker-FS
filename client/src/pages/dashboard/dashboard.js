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
  const { data, pending, error } = useFetch("/api/v1/trans");

  const [isBlur, setIsBlur] = useState(false);
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
        Something went wrong, we are currently fixing it : ( <br /> or Check
        internet your connection
      </h2>
    );
  }

  const { balance, expense, income, transactions } = data;

  let cost = expense.toString();
  if (cost.startsWith("-")) {
    cost = Number(cost.split("-")[1]);
  }

  const handleBlur = () => {
    setIsBlur(!isBlur);
  };

  return (
    <>
      <main className='dashboard'>
        <div className='stats'>
          <div className='balance'>
            <h3>Total balance</h3>
            <div className='cash'>
              <p>&#8358; {isBlur ? "XXXXXXXX" : `${balance}`}</p>
              <button onClick={handleBlur}>
                {isBlur ? <EyeClose /> : <EyeOpen />}
              </button>
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
              <h2 className='text-green-300'>
                &#8358; {isBlur ? "XXXX" : `${income}`}
              </h2>
            </div>
            <div className='exp'>
              <h3>
                <span>
                  <Arrow />
                </span>
                Expense
              </h3>
              <h2 className='text-red-500'>
                &#8358; {isBlur ? "XXXX" : `${cost}`}
              </h2>
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

      const response = await fetch("/api/v1/trans", {
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
      setValues({ detail: "", amount: 0 });
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
        <code>For expenses amount are represented in negative i.e -550</code>
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
