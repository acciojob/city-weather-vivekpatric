import React,{useEffect, useState } from "react";
import axios from 'axios';

function Fetch(){
    let API_KEY = '7ba8db77f6622c4dc08308a9433a4c4f';
    let [search,setSearch] = useState('kolkata');
    let [details,setDetails] = useState({});
    let output;

    useEffect(()=>{
        getData();
    },[search])

function resetSearch(){
    setSearch('');
}

function getData(){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`)
        .then((response)=>{
            output = response.data;
            let obj = {
                temp : (parseInt(output.main.temp)-273.15)*1.8+32,
                desc : output.weather[0].description,
                name : output.name
            }
            setDetails(obj);
            resetSearch();
            console.log('fetch',response.data,'output',output.main.temp)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return (
        <form>
            <input type='text' className='search' onChange={e=>setSearch(e.target.value)} value={search}/>
            <div className="weather" >
                <h1>{details.name}</h1>
                <strong>{details.temp}F</strong>
                <p>{details.desc}</p>
            </div>
        </form>
    )
}
export default Fetch;