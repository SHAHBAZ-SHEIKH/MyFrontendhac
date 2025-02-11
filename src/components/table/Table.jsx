import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([])
  // const rows = [
  //   {
  //     id: 1143155,
  //     category: "Home",
  //     subCategory:"Construction Loan",
  //     img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
  //     name: "John Smith",
  //     date: "1 March",
  //     LoanAmount: 785,
  //     InitailDeposit: "Cash on Delivery",
  //     loanPeriod: "6 Months",
  //     status: "Approved",
  //   },
  //   {
  //     id: 1143155,
  //     category: "Home",
  //     subCategory:"Construction Loan",
  //     img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
  //     name: "John Smith",
  //     date: "1 March",
  //     LoanAmount: 785,
  //     InitailDeposit: "Cash on Delivery",
  //     loanPeriod: "6 Months",
  //     status: "Approved",
  //   },
  //   {
  //     id: 1143155,
  //     category: "Home",
  //     subCategory:"Construction Loan",
  //     img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
  //     name: "John Smith",
  //     date: "1 March",
  //     LoanAmount: 785,
  //     InitailDeposit: "Cash on Delivery",
  //     loanPeriod: "6 Months",
  //     status: "Approved",
  //   },
  //   {
  //     id: 1143155,
  //     category: "Home",
  //     subCategory:"Construction Loan",
  //     img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
  //     name: "John Smith",
  //     date: "1 March",
  //     LoanAmount: 785,
  //     InitailDeposit: "Cash on Delivery",
  //     loanPeriod: "6 Months",
  //     status: "Approved",
  //   },
  //   {
  //     id: 1143155,
  //     category: "Home",
  //     subCategory:"Construction Loan",
  //     img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
  //     name: "John Smith",
  //     date: "1 March",
  //     LoanAmount: 785,
  //     InitailDeposit: "Cash on Delivery",
  //     loanPeriod: "6 Months",
  //     status: "Approved",
  //   },
  // ];


  useEffect(() => {
    const getUsers = async () => {
      const userToken = localStorage.getItem("UserToken")
      console.log("userToken", userToken)
      try {
        const res = await axios.get(`http://localhost:5000/api/loan`, {
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
  }, [])

  const handleStatusChange = async (loanId, newStatus) => {
    try {
      const userToken = localStorage.getItem("UserToken");
      const updateStatus = await axios.put(
        `http://localhost:5000/api/loan/status/${loanId}`,
        { loanStatus: newStatus },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(updateStatus.data);
      toast.success(updateStatus.data.message);
      // Update state to reflect the change immediately
      setList((prevList) =>
        prevList.map((loan) =>
          loan._id === loanId ? { ...loan, loanStatus: newStatus } : loan
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };


  return (
    <>
    <ToastContainer/>
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Category</TableCell>
            <TableCell className="tableCell">SubCategory</TableCell>

            <TableCell className="tableCell">LoanAmount</TableCell>
            <TableCell className="tableCell">Inital Deposit</TableCell>
            <TableCell className="tableCell">Loan Period</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.loanCategory}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.loanSubCategory}</TableCell>

              <TableCell className="tableCell">{row.loanAmount}</TableCell>
              <TableCell className="tableCell">{row.depositAmount}</TableCell>
              <TableCell className="tableCell">{`${row.loanDuration} years`}</TableCell>
              <TableCell className="tableCell">  {new Date(row.createdAt).toLocaleDateString("en-GB")}</TableCell>
              <TableCell className="tableCell">
                <select
                  className={`status ${row.loanStatus}`}
                  value={row.loanStatus}
                  onChange={(e) => handleStatusChange(row._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Approved">Approved</option>
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default List;
