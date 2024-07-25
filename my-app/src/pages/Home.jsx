import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
//this is Home Page 
const Home = () => {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:3001/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setFoodItem(data.fooddata);
      setFoodCat(data.foodcategory.slice(0, 3));
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div className="container my-4">
          <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner w-80" style={{ maxHeight: '500px' }}>
              <div className="carousel-item active">
                <img src="https://img.freepik.com/free-photo/grilled-cheeseburger-with-tomato-sesame-bun-generative-ai_188544-12302.jpg?ga=GA1.1.1129495211.1714569937&semt=sph" className="d-block w-100" alt="Pastry" style={{ objectFit: 'fill', filter: "brightness(40%)" }} />
              </div>
              <div className="carousel-item">
                <img src="https://img.freepik.com/free-photo/freshly-italian-pizza-with-mozzarella-cheese-slice-generative-ai_188544-12347.jpg?ga=GA1.1.1129495211.1714569937&semt=sph" className="d-block w-100" alt="Pizza" style={{ objectFit: 'fill', filter: "brightness(40%)" }} />
              </div>
              <div className="carousel-item">
                <img src="https://img.freepik.com/free-photo/view-delicious-dumplings_23-2150777769.jpg?ga=GA1.1.1129495211.1714569937&semt=sph" className="d-block w-100" alt="Momos" style={{ objectFit: 'fill', filter: "brightness(40%)" }} />
              </div>
              <div className="carousel-item">
                <img src="https://img.freepik.com/free-photo/fried-spring-rolls-cutting-board_1150-17010.jpg?ga=GA1.1.1129495211.1714569937&semt=ais_user" className="d-block w-100" alt="Momos" style={{ objectFit: 'fill', filter: "brightness(40%)" }} />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
            <div className="carousel-caption" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', zIndex: '50', width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '60%', borderRadius: '10px' }}>
              <input className="form-control m-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} style={{
                zIndex: '50', maxWidth: '100%', color: '#fff', border: 'none', outline: 'none', height: '40px', '@media (max-width: 768px)': {
                  height: '10px'
                }
              }} />
            </div>
          </div>
        </div>
        <div className='container mt-4'>
          {foodCat.length > 0 &&
            foodCat.map((data) => (
              <div className='row mb-3' key={data._id}>
                <div className='fs-3 m-3'>
                  {data.categoryName}
                </div>
                <hr />
                <div className='row'>
                  {foodItem.length > 0 ? foodItem
                    .filter((item) => (item.categoryName === data.categoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map((filterItems) => (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card foodItem={filterItems} options={filterItems.options} />
                      </div>
                    )) : <div>No such data found</div>}
                </div>
              </div>
            ))}
        </div>
        <hr />
        <Footer />
      </div>
    </>
  );
};

export default Home;
