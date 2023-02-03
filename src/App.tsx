import { Suspense } from 'react';

import { AppProvider } from './Provider';
import { Layout } from './layouts/layout';
import { HandleRouter } from './router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <AppProvider>
        <Layout>
          <BrowserRouter>
            <HandleRouter />
          </BrowserRouter>
        </Layout>
      </AppProvider>
    </Suspense>
  );
}

export default App;
