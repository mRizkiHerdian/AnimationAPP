import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import ComplexAnimation from './MovingBoxAnimation';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <ComplexAnimation />
    </SafeAreaView>
  );
};

export default App;