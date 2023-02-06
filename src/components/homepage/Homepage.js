import React,{useState,useEffect} from "react";
import './homepage.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import moment from 'moment'
import 'moment-timezone';
import FileDownload from 'js-file-download'
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
        // console.log("path: "+e.target.val)

        var path =e.target.dataset.value
        console.log("name: "+path)



      //   fetch("http://localhost:5000/data/"+path+".pdf").then(response => {
      //     response.blob().then(blob => {
      //         // Creating new object of PDF file
      //         console.log("JSON.stringify(blob): "+JSON.stringify(blob))
      //         const fileURL = window.URL.createObjectURL(blob);
      //         // Setting various property values
      //         console.log("fileURL: "+fileURL)
      //         let alink = document.createElement('a');
      //         alink.href = fileURL;
      //         alink.download = path+'.pdf';
      //         alink.click();
      //     })
      // })

        console.log("66")
        // var url = "http://localhost:5000/data";

        let result = await axios({
          url:"http://localhost:5000/data",
          method:"GET",
          params:{path:path},
          responseType:"blob"
        })

        console.log("resu: "+JSON.stringify(result))
        if(result.status==200){
          FileDownload(result.data,'resume.pdf')
        }else{
          alert("No Resume Found")
        }




        console.log("68")
        // let result = await fetch(url,path)
        // const formdata = new FormData()
        // formdata.append("path",path)
        // let result = await axios.post(url,formdata)
        // // let result = await axios.get(url, {responseType: 'arraybuffer'})
        // console.log("54")
        // if(result){
        //   console.log("opening file"+JSON.stringify(result))
        //   const file = new Blob([result.data], {
        //     type: "application/pdf"
        //   });
        //     window.open(URL.createObjectURL(result.data));
        //   // window.open(result.data)
        // }else{
        //     console.log("something went wrong while downloading the file")
        // }
        // console.log("64")

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
                <td className="view" name="resume" data-value={val.resume} onClick={viewResume}>view</td>
                {/* <a href={"http://localhost:5000/data/"+val.resume+".pdf"}>view</a> */}
              </tr>
            )
          })}
        </table> 
        
        <div className="login_button" onClick={loginpage}>go back</div>
      </div>
    )
}

export default Homepage