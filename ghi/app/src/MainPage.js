import { Link } from 'react-router-dom';
import { useState } from 'react';
import './MainPage.css'
function MainPage() {

      const [currentIndex, setCurrentIndex] = useState(0);

    const messages = [
        "MEMBERS: NEW FEATURES ADDED SOON+",
        "YOUR FAVORITE SHOES ALL IN ONE PLACE",
        "NEW ARRIVALS: CHECK OUT OUR LATEST COLLECTION"
    ];

    const goNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    };

    const goPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
    };


  return (
    <div className="text-center">
      <div className="App h1Container">
                <button onClick={goPrevious}>&lt;</button>
                <span>{messages[currentIndex]}</span>
                <button onClick={goNext}>&gt;</button>
            </div>
      <div className="image-container">
      <img className="mainPageImg" src={'/images/mainimg.jpg'}/>
      </div>
      <div className='mainPageBelowImage'>
      <h1 className="display-5 fw-bold mainPageTitle">WARDROBIFY!</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Need to keep track of your shoes and hats? We have
          the solution for you!
        </p>
        <div>
          <button className="shop-button"><Link className='shopButtonLink' to="/shoes/page">Shop</Link></button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default MainPage;
