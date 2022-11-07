import { Box, Button, LinearProgress, Pagination, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import studentApi from "../../api/studentApi";
import { ListParams, Student } from "../../models";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { cityActions, selecCityMap, selectCityList } from "../city/citySlice";
import Header from "../common/Header";
import { Sidebar } from "../common/Sidebar";
import StudentFilters from "./StudentChildren/StudentFilters";
import StudentTable from "./StudentChildren/StudentTable";
import {
  selectStudentFilter,
  selectStudentList,
  // selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from "./studentSlice";
import { toast } from 'react-toastify';


export function StudentPage() {
  const dispatch = useAppDispatch();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  // const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selecCityMap);
  const cityList = useAppSelector(selectCityList);
  const navigate = useNavigate(); 

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);

  // Handle pagination
  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    console.log("Handle remove student", student);
    try {
      await studentApi.remove(student?.id || "");
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
      toast.success("Delete student successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      console.log("Failed to remove student", err);
    }
  };

  const handleEditStudent = async (student: Student) => {
    navigate(`/admin/student/${student.id}`)
  }

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gridTemplateColumns: "240px 1fr",
          gridTemplateAreas: `"header header" "sidebar main"`,
          minHeight: "100vh",
        }}
      >
        {/* {loading && <LinearProgress sx={{ position: 'absolute', width: '100%', height: '1px !important', paddingTop: '50px' }} />} */}
        <Box sx={{ gridArea: "header", borderBottom: `1px solid #000` }}>
          <Header />
        </Box>
        <Box sx={{ gridArea: "sidebar", borderRight: `1px solid #000` }}>
          <Sidebar />
        </Box>

        <Box sx={{ gridArea: "main", padding: "20px 30px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h4">Students</Typography>
            <Button variant="contained" color="primary">
              <Link to="/admin/student/add">Add new student</Link>
            </Button>
          </Box>

          {/* Filter */}
          <Box mb={3}>
            <StudentFilters
              filter={filter}
              cityList={cityList}
              onChange={handleFilterChange}
              onSearchChange={handleSearchChange}
            />
          </Box>

          {/* StudentTable */}
          <StudentTable studentList={studentList} cityMap={cityMap} onEdit={handleEditStudent} onRemove={handleRemoveStudent} />

          {/* Pagination */}
          <Box my={2} sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              color="primary"
              count={Math.ceil(pagination._totalRows / pagination._limit)}
              page={pagination?._page}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
