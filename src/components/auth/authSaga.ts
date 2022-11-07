import { LoginPayload, logoutStart } from "./authSlice";
import { fork, take, call, put, delay } from "redux-saga/effects";
import { loginStart, loginSuccess, loginFailed } from "./authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "redux-first-history";

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000)
    localStorage.setItem("accessToken", "1234");
    yield put(
      loginSuccess({
        id: 1,
        name: "Ease frontend",
      })
    );
    yield put(push("/admin"));
  } catch (err: any) {
    yield put(loginFailed(err.message));
  }
}

function* handleLogout() {
  localStorage.removeItem("accessToken");
  yield put(push("/"));
}

function* watchLoginFlow() {
  const isLoggedIn = localStorage.getItem("accessToken");
  while (true) {
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(loginStart.type);
      yield fork(handleLogin, action.payload);
    }
    yield take(logoutStart.type);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
