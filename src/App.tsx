import React from 'react';
import Router from './Router';
import ThemeProvider from './theme/ThemeProvider';
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

import { devAppConfig } from './config/dev';

const App: React.FC = () => {
  // let analytics;
  if (process.env.REACT_APP_ENV === 'dev') {
    initializeApp(devAppConfig.firebaseConfig);
    // const app = initializeApp(devAppConfig.firebaseConfig);
    // analytics = getAnalytics(app);
  }

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};

export default App;