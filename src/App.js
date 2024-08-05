
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './layout';
import Theme from './components/shared/Theme';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Theme>
          <Layout />
        </Theme>
      </PersistGate>
    </Provider>
  );
}

export default App;
