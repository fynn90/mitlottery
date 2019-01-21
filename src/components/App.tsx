import React from 'react';
import Header from './Header';
import Options from './Options';
import Lottery from './Lottery'
import ListOfWinners from './ListOfWinners'

const App = () => (
  <section id="mitlottery">
    <Header />
    <section id="main">
      <Options />
      <Lottery />
      <ListOfWinners />
    </section>
  </section>
);

export default App;