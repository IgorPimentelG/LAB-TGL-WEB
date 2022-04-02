import { useEffect, useState } from 'react';
import Loading from '@components/Loading';
import Footer from '@components/Layout/Footer';
import { ToastContainer } from 'react-toastify';
import { TIMER_AWAIT } from '@constants/timer';
import { useVerifyAuth } from '@hooks/useVerifyAuth';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const { verify } = useVerifyAuth();

  useEffect(() => {
    verify();
    setIsLoading(false);
  }, []);

  return (
    <div className="app">
      {isLoading && <Loading/>}
      
      <ToastContainer
        position='top-right'
        autoClose={TIMER_AWAIT}
        hideProgressBar={false}
        draggable
        pauseOnHover
        closeOnClick  
      />
      
      <Footer/>
    </div>
  );
}

export default App;
