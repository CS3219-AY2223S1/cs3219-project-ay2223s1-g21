import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Paper,
  TableHead,
  TableBody,
  TablePagination,
} from "@mui/material";
import { useState } from "react";
import "./history.css";

const columns = [
  {
    id: "title",
    label: "Title",
    minWidth: 170,
    align: "middle",
  },
  {
    id: "difficulty",
    label: "Difficulty",
    minWidth: 50,
    align: "middle",
  },
  {
    id: "time",
    label: "Time",
    minWidth: 160,
    align: "middle",
  },
];

export default function History({ rows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openNewTabUrl = (url) => {
    window.open(url, "_blank").focus();
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", height: "80%" }}>
      <TableContainer id="tablePaper" sx={{ maxHeight: 440, height: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#000",
                    color: "#fff",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={
                            column.id === "title" ? {
                              cursor: "pointer",
                              textDecoration: "underline",
                            } : {}
                          }
                          onClick={() =>
                            column.id === "title" && openNewTabUrl(row.link)
                          }
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
