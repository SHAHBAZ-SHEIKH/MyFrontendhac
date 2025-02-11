export const userColumns = [
    { field: "_id", headerName: "ID", width: 170 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "country",
      headerName: "Country",
      width: 100,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 100,
    },
  ];
  
  export const appointmentColumns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "userId",
      headerName: "UserId",
      width: 150,
    },
    {
      field: "loanId",
      headerName: "LoanId",
      width: 100,
    },
    {
      field: "office",
      headerName: "Office",
      width: 230,
    },
    {
      field: "appointmentDate",
      headerName: "AppointmentDate",
      width: 100,
    },
    {
      field: "time",
      headerName: "Time",
      width: 100,
    },
  ];
  
  export const LoanRequest = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "loanAmount",
      headerName: "LoanAmount",
      width: 180,
    },
    {
      field: "loanCategory",
      headerName: "LoanCategory",
      width: 180,
    },
    {
      field: "loanSubCategory",
      headerName: "LoanSubCategory",
      width: 180,
    },
    {
      field: "depositAmount",
      headerName: "DepositAmount",
      width: 180,
    },
    {
      field: "loanDuration",
      headerName: "LoanDuration",
      width: 180,
    },
    {
      field: "loanStatus",
      headerName: "LoanStatus",
      width: 180,
    },
  ];
  