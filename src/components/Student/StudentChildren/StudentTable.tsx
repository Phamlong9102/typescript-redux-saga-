import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { useState } from "react";
import { City, Student } from "../../../models";
import { ChangeColorMark, ToUpperCaseFirstLetter } from "../../../utils/common";

export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable({ studentList, cityMap, onEdit, onRemove }: StudentTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleRemoveConfirm = (student: Student) => {
    onRemove?.(student);
    setOpen(false); 
  }



  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student) => (
              <TableRow key={student.id}>
                <TableCell width={310}>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{ToUpperCaseFirstLetter(student.gender)}</TableCell>
                <TableCell>
                  <Box color={ChangeColorMark(student.mark)} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    sx={{ marginRight: "10px" }}
                    onClick={() => onEdit?.(student)}
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleRemove(student)} color="secondary">
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student named "{selectedStudent?.name}".
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
            autoFocus
            variant="contained"
            color="secondary"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
