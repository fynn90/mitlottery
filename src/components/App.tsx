import React from 'react';
import Footer from './footer';
import Options from './Options';
import Lottery from './Lottery'
import ListOfWinners from './ListOfWinners'

const App = () => (
  <section id="mitlottery">
    <section id="main">
      <Options />
      <Lottery />
    </section>
    <Footer />
  </section>
);

export default App;