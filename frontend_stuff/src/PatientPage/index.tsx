import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import AddEntryForm from '../AddEntryForm';
import EntryItem from '../components/Entry';
import { apiBaseUrl } from '../constants';
import { addEntry, updatePatient, useStateValue } from '../state';
import { Entry, Patient } from '../types';

const PatientPage = () => {
  const {patientId} = useParams<{patientId: string}>();

  const [{ patients, diagnoses }, dispatch] = useStateValue();

  const iconMap: {
    [gender: string]: SemanticICONS
  } = {
    'male': 'man',
    'female': 'woman',
    'other': 'other gender'
  };

  const submitNewEntry = async (values: unknown) => {
    try {
      const {data: newEntry} = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(addEntry(patientId, newEntry));
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const {data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch(updatePatient(patientData));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patients[patientId] || !patients[patientId].ssn) {
      void fetchPatient();
    }

  }, []);

  if (
    !patients[patientId] || 
    !patients[patientId].ssn ||
    !diagnoses
  ) {
    return <Header as='h4'>Loading</Header>;
  }

  return <Container>
    <Header as='h2'>
      {patients[patientId].name}
      <Icon name={iconMap[patients[patientId].gender]}/>
    </Header>
    <div>ssn: {patients[patientId].ssn}</div>
    <div>occupation: {patients[patientId].occupation}</div>

    <Header as='h3'>
      Entries
    </Header>
    <List>
      {patients[patientId].entries.map(e => 
        <EntryItem key={e.id} entry={e}/>
      )}
    </List>
    <AddEntryForm onSubmit={submitNewEntry} />
  </Container>;
};

export default PatientPage;