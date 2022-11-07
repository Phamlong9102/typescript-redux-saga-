import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { store, history } from "./redux/store";
import { Provider } from "react-redux";
import { HistoryRouter } from "redux-first-history/rr6";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </HistoryRouter>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </Provider>
);
