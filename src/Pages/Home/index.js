import React from 'react';
import Dashboard from './Dashboard';
import HomeProvider from './HomeProvider';

const Home = () => {
    return (
      <HomeProvider>
        <Dashboard />
      </HomeProvider>
    );
};

export default Home;