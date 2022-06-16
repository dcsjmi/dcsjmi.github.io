import './Global.css';
import GlobalHeader from './components/GlobalHeader.jsx';
import PageContainer from './components/PageContainer.jsx';
import Footer from './components/Footer'
import { useState } from 'react';
import { HashRouter } from 'react-router-dom';

/**
 * Returns two row layout
 * first row cotains the header, fixed on page
 * second row contains the current page, the pagecontainer sets up page route
 * and renders the requrired page, the pagecontainer is scrollable
 */
function App() {
  const [shouldHeaderCollapse, SetShouldHeaderCollapse] = useState(false);

  const OnPageScroll = (event) => {
    if (event.target.scrollTop > 100 && shouldHeaderCollapse === false) {
      SetShouldHeaderCollapse(true)
    } else if (event.target.scrollTop < 100 && shouldHeaderCollapse === true) {
      SetShouldHeaderCollapse(false)
    }
  };

  return (
    <HashRouter>
      <div id="App">
        <GlobalHeader shouldCollapse={shouldHeaderCollapse} />
        <div id='AppBody' onScroll={OnPageScroll}>
          <div className='Page'>
            <PageContainer />
            <Footer />
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
