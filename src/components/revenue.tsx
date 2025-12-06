import Balance from './balance';
import Chart from './chart';

const Revenue = () => {
  return (
    <section>
      <div className='flex flex-col lg:flex-row w-full gap-8 lg:gap-16 items-stretch lg:items-start'>
        <Chart />
        <Balance />
      </div>
    </section>
  );
};
export default Revenue;
