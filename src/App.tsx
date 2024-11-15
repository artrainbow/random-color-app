import React from 'react';
import {CustomTextView} from './components/CustomText'
import {AnimatedBackgroundView} from "./components/AnimatedBackground";

const App = () => {
  return (
    <AnimatedBackgroundView>
      <CustomTextView/>
    </AnimatedBackgroundView>
  )
};

export default App;
