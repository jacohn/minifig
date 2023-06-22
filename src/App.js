import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const PLACEHOLDER_IMG='https://via.placeholder.com/150';

const MinifigCard=({minifig})=>{
  const [isFlipped, setIsFlipped]=useState(false);


return (
  <div className="col mb-4">
    <div className="card h-100" onClick={()=> setIsFlipped(!isFlipped)}>
    {isFlipped ? (
      <div>
        <h3 className="card-body">{minifig.name}</h3>
        <p className="card-text">Set# {minifig.set_num}</p>
        <p className="card-text">Number of Parts: {minifig.num_parts}</p>
        <p className="card-text">{minifig.year}</p>
        </div>
    ) : (
      <div>
<img src={minifig.set_img_url || PLACEHOLDER_IMG} className="card-img-top" alt={minifig.name} />
<div className="card-body">
  <h5 className="card-title">{minifig.name}</h5>
  </div>
  </div>
    )}
    </div>
    </div>
);
    };


const MinifigsGrid = ({minifigs})=> {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row cols-md-3 row-cols-lg-4 row-cols-xl-5">
      {minifigs.map((minifig)=> (
        <MinifigCard key={minifig.set_num} minifig={minifig} />
      ))}
    </div>
  );
};

const MinifigsPage=()=> {
  const [minifigs, setMinifigs] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch]= useState('');

  useEffect(()=> {
    const fetchMinifigs = async () => {
      try{
      const response = await axios.get(
        `https://rebrickable.com/api/v3/lego/minifigs/?page=${page}&page_size=50&search=${search}`,
  {
    headers: {
      'Accept': 'application/json',
      'Authorization': `key ${process.env.REACT_APP_API_KEY}`
    }
  }
      );
      setMinifigs(response.data.results);
    } catch (error) {
      console.error('Failed to fetch minifigs:', error);
    }
  };
    fetchMinifigs();
  }, [page, search]);

  return (
    <div className="container">
      <input
        type="text"
        className="form-control my-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search minifigs..."
        />
        <MinifigsGrid minifigs={minifigs} />
        <div className="d-flex justify-content-between my-3"></div>
        <button className="btn btn-primary" onClick={() => setPage(page-1)}>Previous</button>
        <button className="btn btn-primary" onClick={() => setPage(page+1)}>Next</button>
        </div>
        );
};


const App = () => {
  return (
    <div className="App">
    <MinifigsPage />
    </div>
  );
};

export default App;
