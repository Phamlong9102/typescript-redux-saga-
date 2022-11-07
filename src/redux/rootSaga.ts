import { all } from 'redux-saga/effects'; 
import dashboardSaga from '../components/Dashboard/dashboardSaga';
import { authSaga } from '../components/auth/authSaga';
import studentSaga from '../components/Student/studentSaga';
import citySaga from '../components/city/citySaga';

export default function* rootSaga() {
    yield all([authSaga(), dashboardSaga(), studentSaga(), citySaga()])
}