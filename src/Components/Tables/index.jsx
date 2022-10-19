import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Tables = ({rows,columns,pageSize,rowPerPage,checkbox,height}) => {





  return (
    <div style={{ height: height ?? 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize ?? 5}
        rowsPerPageOptions={[rowPerPage] ?? 5}
        checkboxSelection={checkbox ?? false}
      />
    </div>
  );
};

export default Tables;
