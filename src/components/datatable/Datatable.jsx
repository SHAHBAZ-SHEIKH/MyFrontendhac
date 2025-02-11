import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "@/datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Imimport { ToastContainer, toast } from "react-toastify"; // Import Toastify

const Datatable = ({ columns }) => {

  const [list,setList] = useState([])

  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log("path",path)

  useEffect(()=>{
    const getUsers = async () => {
      const userToken = localStorage.getItem("UserToken")
      console.log("userToken",userToken)
      try {
        const res = await axios.get(`http://localhost:5000/api/${path}`,{
          headers: {
            authorization: `Bearer ${userToken}`,
          }
        });
        console.log(res.data);
        setList(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    getUsers()
  },[])
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`loan/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/newUser`} className="link">
          Add New
        </Link>
      </div>
      
        <DataGrid
          className="datagrid"
          rows={list || []} // Ensure rows is never undefined
          columns={columns?.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      
    </div>
  );
};

export default Datatable;
