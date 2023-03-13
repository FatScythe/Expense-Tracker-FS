import { Trash } from "../../icons/icons";
import "./dashboard.css";

const History = () => {
  return (
    <div className='history'>
      <h2 className='title'>
        <span>Transaction History</span>
        <button>Clear All</button>
      </h2>
      <Item />
    </div>
  );
};

const Item = () => {
  return (
    <div className='item'>
      <h2>
        <span className='text-lg'>Rice</span>
        <span className='text-xs font-semibold'>Today</span>
      </h2>

      <p className='gap-5'>
        <span className='text-red-400 text-sm'>- &#8358; 2000</span>
        <button className='rounded-full hover:bg-red-500 p-2'>
          <Trash />
        </button>
      </p>
    </div>
  );
};

export default History;
