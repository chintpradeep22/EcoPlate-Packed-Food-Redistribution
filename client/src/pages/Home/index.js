import React from 'react'
import './Home.css'
import Header from '../../components/Header'
import FoodDisplay from '../../components/FoodDisplay'
import AppDownload from '../../components/AppDownload'

const Home = () => {
  //const [category,setCategory]=useState("All");
  return (
    <div className='home'>
      <Header />
      <FoodDisplay />
      <AppDownload />
    </div>
  )
}

export default Home
