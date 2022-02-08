import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios';
import Details from './details';

const URL = 'https://newsapi.org/v2';
const API_KEY = 'a69051ee940d4fdc89c06ea7ff98af47';

function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const criteria = 'top-headlines?country=us&category=business';
    const address = URL + '/' + criteria + '&apikey=' + API_KEY;

    axios.get(address)
      .then((response) => {
        //console.log(response.data.articles);
        setItems(response.data.articles);
        setIsLoaded(true);
      }).catch(error => {
        setError(error);
      });
  }, []);

  function close() {
    setSelectedItem(null);
  }

  if (selectedItem !=null) {
    return <Details
      title={selectedItem.title}
      image={selectedItem.urlToImage}
      description={selectedItem.description}
      close={close}
    />
  } else if (error) {
    return <p>{error.message}</p>
  } else if (!isLoaded) {
    return <p>Loading...</p>
  } else {
    return (
      <div>
        <h1>Top-headlines</h1>
        <div>
          {
            items.map(item => (
              <div key={item.title} onClick={e => setSelectedItem(item)}>
                <h3>{item.title}</h3>
                <img src={item.urlToImage} />
                <p>{item.description}</p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
