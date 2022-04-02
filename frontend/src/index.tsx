import './index.css';
import App from './App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@store/index';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import Theme from './theme';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Theme>
                <Router/>
                <App />
            </Theme>
        </Provider>
    </BrowserRouter>
, document.getElementById('root'));

