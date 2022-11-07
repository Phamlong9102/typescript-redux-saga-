import { Box, Typography } from "@mui/material";
import Header from "../../common/Header";
import { Sidebar } from "../../common/Sidebar";
import { ChevronLeft } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Student } from "../../../models";
import studentApi from "../../../api/studentApi";
import StudentForm from "../StudentChildren/StudentForm";
import { cityActions } from "../../city/citySlice";
import { useAppDispatch } from "../../../redux/hooks";
import { toast } from 'react-toastify';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<Student>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);

  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const response: Student = await studentApi.getbyId(studentId);
        setStudent(response);
      } catch (err) {
        console.log("Failed to fetch student details", err);
      }
    })();
  }, [studentId]);

  console.log(student)

  const handleStudentFormSubmit = async (formValues: Student) => {
    await studentApi.update(formValues)
    navigate('/admin/student')
    toast.success("Edit student successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    // throw new Error('Testing error')
  };

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gridTemplateColumns: "240px 1fr",
          gridTemplateAreas: `"header header" "sidebar main"`,
          minHeight: "100vh",
        }}
      >
        <Box sx={{ gridArea: "header", borderBottom: `1px solid #000` }}>
          <Header />
        </Box>
        <Box sx={{ gridArea: "sidebar", borderRight: `1px solid #000` }}>
          <Sidebar />
        </Box>
        <Box sx={{ gridArea: "main", padding: "20px 30px" }}>
          <Box>
            <Link to="/admin/student">
              <Typography variant="caption" sx={{ display: "flex", alignItems: "center" }}>
                <ChevronLeft /> &nbsp; Back to student list
              </Typography>
            </Link>
            <Typography variant="h4">Update student info</Typography>

            {/* Edit form */}
            {student && (
              <Box mt={3}>
                <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
