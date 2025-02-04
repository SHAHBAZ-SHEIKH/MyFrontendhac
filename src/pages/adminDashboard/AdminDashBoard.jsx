import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import Navbar from "../../components/adminNavbar/AdminNavbar";
import "./adminsdashboard.scss";
import Widget from  "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import "../../style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import Table from "../../components/table/Table"

const AdminDashBoard = () => {

  const { darkMode } = useContext(DarkModeContext);


  return (
    <div className={`home ${darkMode ? "app dark" : "app"}`}>
      <AdminSidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="loan" />
          
        </div>
        <div className="charts">
          {/* <Featured /> */}
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Loan Request</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
