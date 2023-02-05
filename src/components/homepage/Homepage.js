import React,{useState,useEffect} from "react";
import './homepage.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import moment from 'moment'
import 'moment-timezone';

const Homepage = () =>{

    const [data,setData] = useState([])
    const navigate = useNavigate()
    

    useEffect(()=>{
        console.log("19")
        
        try{
            console.log("22")
            const getStudents = async()=>{
                console.log("24")
                let result = await axios.get("http://localhost:5000/student_list")
                if(result.data.success){
                    // console.log("Res: "+JSON.stringify(result))
                    setData(result.data.list)
                }else{
                    console.log("no data found")
                }
                                
            }

            getStudents();


        }catch(err){
            console.log(err)
        }

    },[])

    const loginpage = ()=>{
        navigate('/login')
    }

    const viewResume= async (e)=>{
        console.log("path: "+e.target.val)
        // var url = "http://localhost:5000"+path+".pdf";
        // let result = await axios.get(url)
        // if(result){
        //     window.open(URL.createObjectURL(result.data));
        // }else{
        //     console.log("something went wrong while downloading the file")
        // }
    }

    return (
        <div className="App">

        
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date Time</th>
            <th>Resume</th>
          </tr>
          {data.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.phone}</td>
                <td>{moment(val.created_at).tz("Asia/Kolkata").format("DD MMM 'YY")}  {moment(val.created_at).tz("Asia/Kolkata").format("hh:mm a")}</td>
                {/* <td>{val.updated_at}</td> */}
                <td onClick={viewResume}>view</td>
              </tr>
            )
          })}
        </table> 
        
        <div className="login_button" onClick={loginpage}>go back</div>
      </div>
    )
}

export default Homepage