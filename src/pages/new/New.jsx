import "./new.scss";
import Sidebar from "../../components/mySidebar/AdminSidebar";
import Navbar from "../../components/adminNavbar/AdminNavbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      

      const newUser = {
        ...info,
       
      };

      await axios.post("http://localhost:3003/api/user/signup", newUser);
      toast.success("User has been created.");
      setTimeout(() => {
        navigate("/users");
        
      }, 2000);
    } catch (err) {
      toast.error("Failed to create user. Please try again.");
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className="new">
      <ToastContainer />
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
              

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
