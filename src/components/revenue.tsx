import Balance from './balance';
import Chart from './chart';

const Revenue = () => {
  return (
    <section>
      <div className='flex w-full gap-16 items-start'>
        <Chart />
        <Balance />
      </div>
    </section>
  );
};
export default Revenue;
