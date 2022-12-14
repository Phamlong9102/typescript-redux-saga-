import { PayloadAction } from "@reduxjs/toolkit";
import { debounce, takeLatest } from "redux-saga/effects";
import studentApi from "../../api/studentApi";
import { ListParams, ListResponse, Student } from "../../models";
import { studentActions } from "./studentSlice";
import { put, call } from 'redux-saga/effects'; 

function* fetchStudentList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload); 
        yield put(studentActions.fetchStudentListSuccess(response))
    } catch (error) {
        yield put(studentActions.fetchStudentListFailed())
    }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
    yield put(studentActions.setFilter(action.payload))
}

export default function* studentSaga() {
    yield takeLatest(studentActions.fetchStudentList, fetchStudentList) 
    yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce) 
}





