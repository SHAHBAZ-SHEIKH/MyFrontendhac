import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      category: "Home",
      subCategory:"Construction Loan",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      name: "John Smith",
      date: "1 March",
      LoanAmount: 785,
      InitailDeposit: "Cash on Delivery",
      loanPeriod: "6 Months",
      status: "Approved",
    },
    {
      id: 1143155,
      category: "Home",
      subCategory:"Construction Loan",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      name: "John Smith",
      date: "1 March",
      LoanAmount: 785,
      InitailDeposit: "Cash on Delivery",
      loanPeriod: "6 Months",
      status: "Approved",
    },
    {
      id: 1143155,
      category: "Home",
      subCategory:"Construction Loan",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      name: "John Smith",
      date: "1 March",
      LoanAmount: 785,
      InitailDeposit: "Cash on Delivery",
      loanPeriod: "6 Months",
      status: "Approved",
    },
    {
      id: 1143155,
      category: "Home",
      subCategory:"Construction Loan",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      name: "John Smith",
      date: "1 March",
      LoanAmount: 785,
      InitailDeposit: "Cash on Delivery",
      loanPeriod: "6 Months",
      status: "Approved",
    },
    {
      id: 1143155,
      category: "Home",
      subCategory:"Construction Loan",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      name: "John Smith",
      date: "1 March",
      LoanAmount: 785,
      InitailDeposit: "Cash on Delivery",
      loanPeriod: "6 Months",
      status: "Approved",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Category</TableCell>
            <TableCell className="tableCell">SubCategory</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">LoanAmount</TableCell>
            <TableCell className="tableCell">Inital Deposit</TableCell>
            <TableCell className="tableCell">Loan Period</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.category}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.subCategory}</TableCell>
              <TableCell className="tableCell">{row.name}</TableCell>
              <TableCell className="tableCell">{row.LoanAmount}</TableCell>
              <TableCell className="tableCell">{row.InitailDeposit}</TableCell>
              <TableCell className="tableCell">{row.loanPeriod}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
