import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Student } from "../../../models";

export interface StudentRankingListProps {
  studentList: Student[]; 

}

export default function StudentRankingList({studentList}: StudentRankingListProps) {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Mark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.mark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
