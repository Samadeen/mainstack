import './App.css';
import Revenue from './components/revenue';
import Header from './components/header';
import Transaction from './components/transaction';
import AppBar from './components/app-bar';

function App() {
  return (
    <>
      <Header />
      <AppBar />
      <div className='max-w-[1240px] mx-auto mt-20'>
        <Revenue />
        <Transaction />
      </div>
    </>
  );
}

export default App;
