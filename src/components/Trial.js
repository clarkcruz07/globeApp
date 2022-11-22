import React from 'react'
import useAutoLogout from "./IdleTimeout";
export const Trial = () =>{
    const timer = useAutoLogout(30);

  if (timer == 0) {
    return <div>Logged Out</div>;
  }

  if (timer < 30) {
    return <div>In {timer} seconds you will be automatically logged out</div>;
  }
    return (
        <>
        <div>Signed in</div>
        </>    
            
    )
}

export default Trial