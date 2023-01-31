import { Suspense } from 'react';

import { Provider } from './Provider';
import { Layout } from './layouts/layout';
import { HandleRouter } from './router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <Provider>
        <Layout>
          <BrowserRouter>
            <HandleRouter />
          </BrowserRouter>
        </Layout>
      </Provider>
    </Suspense>
  );
}

export default App;
