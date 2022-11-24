import React from 'react'
import globeLogo from '../assets/img/globeLogo.svg'
import easyHub from '../assets/img/locationPin.svg'

/* components */
import Body from './Body'
export const Header = () =>{
    return (
        <>
        <div className="row">
            <div className="panel panel-default mt-5 w-100 mx-auto rounded-big">
                <div className="panel-body p-3">
                    
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="globeLogo">
                            <img src={globeLogo} />
                        </div>
                        <div className="easyHub">
                            <img src={easyHub} />
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    <Body />
        </>    
            
    )
}

export default Header