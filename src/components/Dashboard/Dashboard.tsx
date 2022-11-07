import { PeopleAlt } from "@mui/icons-material";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Header from "../common/Header";
import { Sidebar } from "../common/Sidebar";
import StatisticsItem from "./DashboardChildren/StatisticsItem";
import StudentRankingList from "./DashboardChildren/StudentRankingList";
import Widget from "./DashboardChildren/Widget";
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from "./dashboardSlice";

export function Dashboard() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gridTemplateColumns: "240px 1fr",
          gridTemplateAreas: `"header header" "sidebar main"`,
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* Loading */}
        <div className="absolute top-[20%] with-[100px] height-[3px]">
          {loading && <LinearProgress className=" with-[100px] height-[3px]  bg-[red] text-[red]" />}
        </div>
        <Box sx={{ gridArea: "header", borderBottom: `1px solid #000` }}>
          <Header />
        </Box>
        <Box sx={{ gridArea: "sidebar", borderRight: `1px solid #000` }}>
          <Sidebar />
        </Box>

        {/* Statistics actions */}
        <Box sx={{ gridArea: "main", padding: "20px 30px" }}>
          {/* All */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <StatisticsItem
                icon={<PeopleAlt fontSize="large" color="primary" />}
                label="male"
                value={statistics.maleCount}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatisticsItem
                icon={<PeopleAlt fontSize="large" color="primary" />}
                label="female"
                value={statistics.femaleCount}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatisticsItem
                icon={<PeopleAlt fontSize="large" color="primary" />}
                label="mark >= 8"
                value={statistics.highMarkCount}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatisticsItem
                icon={<PeopleAlt fontSize="large" color="primary" />}
                label="mark <= 5"
                value={statistics.lowMarkCount}
              />
            </Grid>
          </Grid>
          
          {/* All stundents rankings */}
          <Box mt={5}>
            <Typography variant="h4">All students</Typography>
            <Box mt={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                  <Widget title="Student with highest mark">
                    <StudentRankingList studentList={highestStudentList} />
                  </Widget>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Widget title="Student with lowest mark">
                    <StudentRankingList studentList={lowestStudentList} />
                  </Widget>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* Ranking by city*/}
          <Box mt={5}>
            <Typography variant="h4">Ranking by city</Typography>
            <Box mt={2}>
              <Grid container spacing={3}>
                {rankingByCityList.map((ranking) => (
                  <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                    <Widget title={`Tp. ${ranking.cityName}`}>
                      <StudentRankingList studentList={ranking.rankingList} />
                    </Widget>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
