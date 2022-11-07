import { Box } from "@mui/material";
import Header from "../components/common/Header";
import { Sidebar } from "../components/common/Sidebar";

export function Admin() {
  return (
    <>
      <div className="">
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
          </Box>
        </Box>
      </div>
    </>
  );
}
