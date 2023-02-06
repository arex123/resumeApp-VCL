import React, { useEffect, useState } from "react";
import './studentform.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Student_form = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: ""
    })
    const [file, setFile] = useState(null)
    const [filename, setFilename] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target

        setUser(
            {
                ...user,
                [name]: value
            }
        )
    }

    const fileUpload = (e) => {
        console.log("e:" + e.target.files)
        setFile(e.target.files[0])
        setFilename(e.target.files[0].filename)
    }
    const submitForm = async () => {
        const { name, email, phone } = user
        if (name && email && phone && file) {
            console.log("posted : " + user.name)
            const formdata = new FormData()
            formdata.append("name", user.name)
            formdata.append("email", user.email)
            formdata.append("phone", user.phone)
            formdata.append("file", file)
            formdata.append("filename", filename)
            // console.log("formdata: "+JSON.stringify(formdata))
            let result = await axios.post("http://localhost:5000/student_form", formdata)

            if (result.data.success) {
                console.log(result)
                setUser({
                    name: "",
                    email: "",
                    phone: ""
                })
                setFile(null)
                setFilename("")
                alert(result.data.message)
            } else {
                alert("Something went wrong")
            }    // prompt(res.data)

        } else {
            alert("Enter form correctly")
        }
    }

    const loginpage = ()=>{
        localStorage.removeItem('student')
        navigate('/login')
    }


    useEffect(()=>{
        let login = localStorage.getItem('student')
        if(!login){
            navigate('/login')
        }
    })


    return (
        <div className="register">
            <h1>Student Details</h1>
            <input type="text" placeholder="Enter Name" name="name" value={user.name} onChange={handleChange} ></input>
            <input type="text" placeholder="Enter Email" name="email" value={user.email} onChange={handleChange} ></input>
            <input type="number" placeholder="Enter Phone" name="phone" value={user.phone} onChange={handleChange} ></input>
            <input type="file" accept="application/pdf" placeholder="Upload Resume" name="resume" value={filename} onChange={fileUpload} ></input>
            <div className="button" onClick={submitForm}>Submit</div>
            <div className="login_button" onClick={loginpage}>Logout</div>
        </div>
    )
}
export default Student_form