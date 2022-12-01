import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {useNavigate, useLocation} from 'react-router-dom'
import globeLogo from '../assets/img/globeLogo.svg'
import easyHub from '../assets/img/locationPin.svg'
import doorOpen from '../assets/img/doorOpen.svg'
import doorClose from '../assets/img/doorClose.svg'
import reopenBtn from '../assets/img/reopenBtn.svg'
import lockBtn from '../assets/img/lockBtn.svg'
/* components */
import useAutoLogout from "./IdleTimeout";
export const Door = () =>{
    const location = useLocation()
    const doorURL = 'http://localhost:9090/api/lockercontroller/door/'
    const APIurl = 'https://globe-api.onrender.com/api/update/transStatus'
    const navigate = useNavigate()
    const dataOrderNumber = location.state.order_number
    const dataDoorNumber = location.state.doornumber
    const dataMobileNumber = location.state.mobileno
    const dataDoorSize = location.state.doorsize
    const dataTransStatus = location.state.transstatus
    const qPin = location.state.qpin
    const doorStatusAPI = doorURL + dataDoorNumber + "/status"
    const [disable, setDisable] = useState(true)
    let delay = '';
    const [doorStatusOpen, setDoor] = useState(doorOpen)
    
    const videoBg = './globeGradientBG.mp4'
    let timer = useAutoLogout(32);
    const [timerData, setTimer] = useState(0)
    /* */
    
    const updateStatus = () => {
        navigate('/')
        let status = ""
        if(dataTransStatus == 1){
            status = "2"
        }
        else if(dataTransStatus == 2){
            status = "3"
        }

        axios.patch(APIurl + "?transNumber="+dataOrderNumber, {
            transStatus: status,
            mobileNumber: dataMobileNumber,
            doorSize: dataDoorSize,
            doorNumber: dataDoorNumber
        }).then(resp => {                   
            console.log('status updated')
            navigate('/')
        }).catch(error => {
            console.log(error);
        });
    }
    const fetchData = () => {
        if(dataOrderNumber == '' || dataTransStatus==3 || dataDoorNumber == ''){
            navigate('/',{state : {message: 'Transaction not found'}})
        }
        else{
            axios
            .get(doorURL + dataDoorNumber + "/open").then(res => {
                
                if(dataTransStatus == 1){
                    document.getElementById('lockbtn').classList.add('opacity')
                    document.getElementById('lockbtn').disabled = true
                }
            })
            .catch(error => {
                console.log(error.message)
            })
        }
        
    }

    const postData = () => {
        axios
        .get(doorURL + dataDoorNumber + "/open").then(res => {
            setDoor(doorOpen)
            document.getElementById('reopen').disable = true
            document.getElementById('reopen').classList.add('opacity')
            
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    const fetchStatus = () => {
        
        const doorAPI = doorURL + dataDoorNumber+'/status'
        axios.get(doorAPI).then(res => {
            const doorStatus = res.data.data.doorStatus
            //
            const trigger = document.getElementById('cont')
            if(doorStatus == 'open'){
                document.getElementById('lockbtn').classList.add('opacity')
                document.getElementById('lockbtn').disabled = true
                document.getElementById('door-image').style.paddingLeft = '1rem'
                trigger.click() 
            }
            else{
                document.getElementById('reopen').disable = false
                document.getElementById('reopen').classList.remove('opacity')

                document.getElementById('lockbtn').classList.remove('opacity')
                document.getElementById('lockbtn').disabled = false
                setTimer(res.data.data.doorStatus) 
                setDoor(doorClose)
            }
            
            
        }).catch(err => { 
            console.log(err)
        });
    }
    if(timer == 0){
        updateStatus()
    }
    useEffect(() => {
            fetchData()
           
            const dataInterval = setInterval(()=> {
                fetchStatus()
            },500)
            
            return () => clearInterval(dataInterval)
            
          
    },[])

    
 /* set idle timeout */
 
 

    return (
        <>
        <div className="container" id="cont">
           
            
            
                <div className="col-md-12 col-sm-12 body-wrapper">
                    <div className="panel panel-default mt-5 w-50 mx-auto rounded-big">
                    <div><img src={doorStatusOpen} className="locker-door" id='door-image' /></div>
                        <div className="panel-body p-3 panel-locker">
                         
                            <div><img src={reopenBtn} disabled={disable} className="opacity" id="reopen" onClick={postData} /></div>
                            <div><img src={lockBtn}  onClick={updateStatus} id="lockbtn" /></div>
                            
                        </div>
                        <div>
                           <span className="text-light">
                             {
                                (() => {
                                    if(timerData == 'close' && timer < 31) {
                                        const timerChuva = <div><h3>Door locking in {timer} seconds.</h3></div>
                                        return timerChuva
                                    }   
                                })()  
                            } 
                            </span>
                        </div>
                    </div>
                    
                </div>
        </div>
        </>    
            
    )
}

export default Door