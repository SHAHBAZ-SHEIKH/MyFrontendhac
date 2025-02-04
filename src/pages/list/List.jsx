import "./list.scss"
import AdminNavbar from "@/components/adminNavbar/AdminNavbar"
import AdminSidebar from "@/components/adminSidebar/AdminSidebar"
import Datatable from "../../components/datatable/Datatable"
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const List = ({columns}) => {
    const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`list ${darkMode ? "app dark" : "app"}`}>
      <AdminSidebar/>
      <div className="listContainer">
        <AdminNavbar/>
        <Datatable columns={columns}/>
      </div>
    </div>
  )
}

export default List