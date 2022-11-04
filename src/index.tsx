import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { store, history } from "./redux/store";
import { Provider } from "react-redux";
import { HistoryRouter } from "redux-first-history/rr6";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </HistoryRouter>
  </Provider>
);
