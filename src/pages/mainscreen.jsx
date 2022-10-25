import React from 'react'
import { Link } from "react-router-dom"
import "../stylesheets/default.css";
export default class WelcomePage extends React.Component {

  render(){
		return (
    <div class="area" >
          <ul class="circles">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
          </ul>
          <div className=" flex flex-wrap justify-center h-full w-full sm:w-full sm:mx-auto  ">
    <div className="flex flex-wrap justify-items-center	p-8 my-auto h-[25rem]  bg-[#15161D]  sm:w-80  rounded-xl shadow-lg flex-col border-2 border-[#0000007c]">
      <h1 className='text-center text-[#ebebeb] font-bold  h-1/2 text-4xl sm:text-lg sm:h-30'>Welcome To Coconut Overflow</h1>
      <div className="flex flex-col justify-center sm:mx-auto items-center sm:w-60">
            <Link to="/login">      
            <button className='w-80  sm:w-60  sm:mx-auto py-3 text-[#131419] cursor-pointer bg-[#ABACAB] rounded-lg font-extrabold'
                style={{marginTop:10, marginBottom:10}}>
                Login
            </button>
            </Link>
            <Link to="/Register">      
            <button className='w-80 sm:w-60 xs:w-10 sm:mx-auto py-3 text-[#fffffffd] cursor-pointer bg-[#CC1150] rounded-lg font-extrabold'
                style={{marginTop:10, marginBottom:10}}>
                Register
            </button>
            </Link>       
        </div>
        </div>
      </div>
    </div>);
	}
  
}

