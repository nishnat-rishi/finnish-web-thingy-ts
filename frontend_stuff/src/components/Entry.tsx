import React from 'react';
import { Header, Icon, List, Segment } from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';
import { useStateValue } from '../state';
import { Entry } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryItem = ({ entry }: {entry: Entry}) => {

  const [{ diagnoses }] = useStateValue();

  const ratingToColorMap: Array<SemanticCOLORS> = [
    'green',
    'yellow',
    'orange',
    'red'
  ];

  switch (entry.type) {
    case 'HealthCheck':
      return <Segment>
        <Header as='h3'>
          <Header.Content>
            {entry.date}
            <Icon name='doctor' />
            <Header.Subheader>
              {entry.description}
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Header as='h4'>
          <Header.Content>
            Health Check Rating{' '}
            <Icon
              name='heart outline' 
              color={ratingToColorMap[entry.healthCheckRating]} 
            />
          </Header.Content>
        </Header>
        <List bulleted>
          {entry.diagnosisCodes?.map(c => 
            <List.Item key={c}>
              {c}: {diagnoses[c] && diagnoses[c].name}
            </List.Item>
          )}
        </List>
      </Segment>;
    case 'Hospital':
      return <Segment>
        <Header as='h3'>
          <Header.Content>
            {entry.date}
            <Icon name='stethoscope' />
          </Header.Content>
          <Header.Subheader>
            {entry.description}
          </Header.Subheader>
        </Header>
        <Header as='h4'>
          <Header.Content>
            Discharge Details
          </Header.Content>
          <Header.Subheader>
            Discharge Criteria: {entry.discharge.criteria}
          </Header.Subheader>
          <Header.Subheader>
            Discharge Date: {entry.discharge.date}
          </Header.Subheader>
        </Header>
        <List bulleted>
          {entry.diagnosisCodes?.map(c => 
            <List.Item key={c}>
              {c}: {diagnoses[c] && diagnoses[c].name}
            </List.Item>
          )}
        </List>
      </Segment>;
    case 'OccupationalHealthcare':
      return <Segment>
        <Header as='h3'>
          <Header.Content>
            {entry.date}
            <Icon name='address card' />
          </Header.Content>
          <Header.Subheader>
            {entry.description}
          </Header.Subheader>
        </Header>
        {
          entry.sickLeave &&
            <Header as='h4'>
              <Header.Content>
                Sick Leave Details
              </Header.Content>
              <Header.Subheader>
                Start Date: {entry.sickLeave.startDate}
                End Date: {entry.sickLeave.endDate}
              </Header.Subheader>
            </Header>
        }
        <List bulleted>
          {entry.diagnosisCodes?.map(c => 
            <List.Item key={c}>
              {c}: {diagnoses[c] && diagnoses[c].name}
            </List.Item>
          )}
        </List>
      </Segment>;
    default:
      assertNever(entry);
      return null;
  }
};

export default EntryItem;