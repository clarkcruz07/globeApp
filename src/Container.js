import React, {useEffect} from 'react'
import Header from './components/Header'
export const Container = () =>{
    const videoBg = './globeGradientBG.mp4'

    return (
        <>
        
            <div className="container">
                <video autoPlay muted loop id="videoBg">
                    <source src={videoBg} type="video/mp4" />
                </video>
                <Header />
            </div> 
        </>
    )
}

export default Container