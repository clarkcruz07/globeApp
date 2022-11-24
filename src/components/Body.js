import React,{useEffect, useState} from 'react'
import Button from '../assets/img/enterBtn.svg'
import axios from 'axios'
import {useNavigate, Link, useLocation} from 'react-router-dom'

import { Player } from '@lottiefiles/react-lottie-player';
import loader from '../assets/json/globeLoader.json'
export const Body = () =>{
    const [orderNumber, setOrderNumber] = useState('')
    const [loaderAnimation, setLoader] = useState('')
    const APIUrl = 'https://globe-api.onrender.com/api/getAll/transNumber/'
    const doorURL = 'http://localhost:9090/api/lockercontroller/door/'

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const location = useLocation()
    /*const data = location.state.message
    if(data != null){
        data = location.state.message
    }
    else{
        data =""
    }*/
        const postData = () => {
        document.getElementById('enter-btn').classList.add('hidden')
        document.getElementById('lottie').classList.remove('hidden')
        
        axios.get(APIUrl + "?transNumber="+ orderNumber).then(res => {
            
            const trans_number = res.data[0].transNumber
            const door_number = res.data[0].doorNumber
            const mobile_number = res.data[0].mobileNumber
            const door_size = res.data[0].doorSize
            const trans_status = res.data[0].transStatus
            
            
            if(trans_status == "" || trans_status == '3' || door_number == "" || trans_status == '2'){
                setError("Transaction not found")
                document.getElementById('enter-btn').classList.remove('hidden')
                document.getElementById('lottie').classList.add('hidden')
            }
            else{
                    navigate('/doors', 
                    {
                        state : {
                            order_number: trans_number, 
                            doornumber: door_number, 
                            mobileno: mobile_number, 
                            doorsize: door_size,
                            transstatus: trans_status
                        }
                    })
                
               
            }
            
            
        }).catch(err => { 
           
            document.getElementById('enter-btn').classList.remove('hidden')
            document.getElementById('lottie').classList.add('hidden')
          
                axios.get("https://globe-api.onrender.com/api/get/qpin/?qpin="+ orderNumber).then(response => {
                    const q_pin = response.data[0].qpin
                    const trans_number = response.data[0].transNumber
                    const door_number = response.data[0].doorNumber
                    const mobile_number = response.data[0].mobileNumber
                    const door_size = response.data[0].doorSize
                    const trans_status = response.data[0].transStatus
                    if(trans_status == 2){
                        navigate('/doors', 
                        {
                            state : {
                                order_number: trans_number, 
                                doornumber: door_number, 
                                mobileno: mobile_number, 
                                doorsize: door_size,
                                transstatus: trans_status,
                                qpin: q_pin

                            }
                        })
                    }
                    else{
                        setError("Transaction not found")
                    }
                }).catch(err => {
                    setError("Transaction not found")
                })
                //
        });
    }
    useEffect(() => {
        
        
    },[])


    return (
    <>
    <div className="col-md-12 body-wrapper">
        <div className="col-md-12 col-sm-12">
            <div className="panel panel-default mt-5 w-100 mx-auto rounded-big">
                <div className="panel-body p-3">
                    
                    <div className="d-flex justify-content-around align-items-center pr-2 flex-wrap">
                        
                        <input type="text" className="txt-pin text-uppercase" placeholder='Enter quickpin' maxLength="16" onChange={(e) => setOrderNumber(e.target.value.toUpperCase())} />
                        <div className="txt-error position-absolute">{error}</div>
                    </div>
                    
                </div>

            </div>
        </div>

        <div className="col-md-12 col-sm-12">
            <div className="panel panel-default mt-5 w-100 mx-auto rounded-big">
                <div className="panel-body p-3">
                    
                    <div className="d-flex justify-content-around align-items-center enter-btn">
                        
                        <img src={Button} onClick={postData} id="enter-btn" />
                        <div id="lottie" className="hidden">
                        <Player 
                        src={loader}
                        loop
                        autoplay
                        />
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    </div>
    </>
    )
}

export default Body