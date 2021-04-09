import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import { setDiagnosesList, setPatientList, useStateValue } from './state';
import { Diagnosis, Patient } from './types';

import PatientListPage from './PatientListPage';
import PatientPage from './PatientPage';

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosesList = async () => {
      try {
        const {data: diagnosesCodesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosesList(diagnosesCodesFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatientList();
    void fetchDiagnosesList();
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Container>
          <Header as='h1'>Patientor</Header>
          <Button as={Link} to='/' primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route exact path='/'>
              <PatientListPage />
            </Route>
            <Route path='/patients/:patientId'>
              <PatientPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
