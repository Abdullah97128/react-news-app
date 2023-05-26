import React, { useState } from 'react';
import Header from '../../components/Navbar/Header';
import Popular from '../popular/Popular';
import './Home.css';
import Search from '../../components/Search/Search';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterValues, setFilterValues] = useState(null);


  const handleFilter = (values) => {
    console.log('Filter values:', values);
    setFilterValues(values);
    setSearchKeyword('');
  };

  return (
    <>
    <div className='top-container'>
      <Header />
      <section className="mainContent">
        <Search onFilter={handleFilter} />
        <Popular filterValues={filterValues} />
      </section>
      <Footer/>
    </div>
    </>
  );
};

export default Home;
