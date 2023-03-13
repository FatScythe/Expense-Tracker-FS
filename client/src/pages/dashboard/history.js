import { Trash } from "../../icons/icons";
import "./dashboard.css";

const History = () => {
  return (
    <div className='history px-3 text-black my-4'>
      <h2 className='title flex justify-between items-center'>
        <span className='font-bold text-base'>Transaction History</span>
        <button className='text-red-500'>Clear All</button>
      </h2>
      <Item />
      <Input />
    </div>
  );
};

const Item = () => {
  return (
    <div className='item my-2 flex justify-between cursor-pointer items-center bg-slate-200 hover:bg-slate-300 drop-shadow-sm p-3 hover:translate-x-1 hover:translate-y-1 transition-all duration-slow rounded-md'>
      <h2 className='flex justify-between flex-col items-start gap-2'>
        <span className='text-lg'>Rice</span>
        <span className='text-xs font-semibold'>Today</span>
      </h2>

      <p className='flex justify-between items-center gap-5'>
        <span className='text-red-400 text-sm'>- &#8358; 2000</span>
        <button className='rounded-full hover:bg-red-500 p-2'>
          <Trash />
        </button>
      </p>
    </div>
  );
};

const Input = () => {
  return <form>Input</form>;
};

export default History;
