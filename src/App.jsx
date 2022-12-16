import React,{useState,useEffect} from 'react';
import './App.css'
const search =require('lodash')
export default function Home(){
  const [data,setData]  = useState([])
  const [searchData,setsearchData] =useState("")
  const [filteredData,setFilteredData]=useState([])
  const [addData,setAddData] = useState([])
  console.log(addData) 
  const getData=async()=>{
    const Response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
    const Result = await Response.json();
    setData(Result.meals)
  }
  useEffect(()=>{
    getData()
  },[])

// console.log(data)

const additemData = (item,index)=>{
  let obj = {
    "meal" : item.strMeal,
    "price" : 20
  }
  setAddData([...addData,obj])
  
}  

  const searchFunction=()=>{
    if(searchData.length >3){
        let filterDataItems = search.filter(data, {"strCategory":searchData})
        setFilteredData(filterDataItems)
    }
} 

return(
  <center>
  <div id='container'>
    <div id="header">
    <img src="https://www.themealdb.com/images/logo-small.png" alt=""  id='themeimg'/>
    <input type="text" id='search' placeholder='Searc..' onChange={(e)=>{
      setsearchData(e.target.value)
      searchFunction()
    }}/>
    </div>
    <span>
    <img src="https://www.themealdb.com/images/meal-icon.png" alt=""  id='img'/>
    <h1 id='welcome'>Welcome to TheMealDB</h1>
    <h4 id='para'>Welcome to TheMealDB: An open, crowd-sourced database of Recipes from around the world.</h4>
    <h4 id='para2'>We also offer a free JSON API for anyone wanting to use it, with additional features for subscribers.</h4>
    <img src="https://www.themealdb.com/images/meal-icon.png" alt="" id='img2'/>
    </span>
    <div id="flex">
      
{
  searchData.length>3?filteredData.map((item,index)=>{
    return(
      <div>
        <img src={item.strMealThumb} alt="" width="200px" height="200px"/>
        <h5 id='meal'>{item.strMeal}</h5>
        <h4 id='category'>{item.strCategory}</h4>
        <span>
        <button>Rs.20</button>
        <button>Add to Cart</button> 
        </span>
      </div> 
    )
  }):
  data.map((item,index)=>{
    return(
      
      <div>
        <img src={item.strMealThumb} alt="" width="200px" height="200px"/>
        <h5 id='meal'>{item.strMeal}</h5>
        <h4 id='category'>{item.strCategory}</h4>
        <span>
        <button>Rs.20</button>
        <button onClick={()=>{
          additemData(item)
        }}>Add to Cart</button> 
        </span>
      </div> 
    )
  })
} 
</div>
</div>
</center>
)
}