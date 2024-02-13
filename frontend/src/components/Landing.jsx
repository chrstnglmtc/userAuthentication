/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';
import "../Auth.css"
import Footer from "./Footer";
import Navigation from "./Navigation";

const Landing = () => {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();
  return (
    <div>
      <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> 
     <div className="content-container">
     <div className="text-container">
       <div>
         <h1
           style={{
             fontFamily: "Inter, sans-serif",
             fontSize: "2rem",
             fontWeight: 800,
             marginBottom: "1rem",
           }}
         >
           ONLINE LEARNING
         </h1>
         <h2
           style={{
             fontSize: "1.5rem",
             fontWeight: 600,
             marginBottom: "1rem",
           }}
         >
           Gain knowledge. Learn your way. Be the best
         </h2>
       </div>
       <div className="TeamA-card-container">
         <div className="TeamA-card">
           <div className="TeamA-card-title">
             <h3 >SQL QUERY</h3>
           </div>

           <div className="TeamA-card-body">
             <Link to="/">
               <button className="teamA_button">View </button>
             </Link>
           </div>

           <div className="TeamA-card-button">
             <Link to="/register">
               <button className="teamA_button">Enroll </button>
             </Link>
           </div>
         </div>
         <div className="TeamA-card">
           <div className="TeamA-card-title">
             <h3 >VERSION CONTROL: SVN</h3>
           </div>

           <div className="TeamA-card-body">
             <Link to="/">
               <button className="teamA_button">View </button>
             </Link>
           </div>

           <div className="TeamA-card-button">
             <Link to="/register">
               <button className="teamA_button">Enroll </button>
             </Link>
           </div>
         </div>
         <div className="TeamA-card">
           <div className="TeamA-card-title">
             <h3 >HTML PROGRAMMING</h3>
           </div>

           <div className="TeamA-card-body">
             <Link to="/">
               <button className="teamA_button">View </button>
             </Link>
           </div>

           <div className="TeamA-card-button">
             <Link to="/register">
               <button className="teamA_button">Enroll </button>
             </Link>
           </div>
         </div>
       </div>
     </div>
     <div className="image-container">
       <img
         src="/assets/images/logo.png"
         alt="Description of the photo"
       />
     </div>
   </div>
   <Footer />
 </div>
);
};

export default Landing;