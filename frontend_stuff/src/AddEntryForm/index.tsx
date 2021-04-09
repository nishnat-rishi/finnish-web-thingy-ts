import React from 'react';

import { Field, Form, Formik } from 'formik';
import { Button, FormField, Grid, Header } from 'semantic-ui-react';
import { 
  DiagnosisSelection, 
  EntryTypeOption, 
  HealthCheckRatingOption, 
  SelectEntryTypeField, 
  SelectHealthCheckRatingField
} from './FormField';
import { Entry, HealthCheckRating } from '../types';
import { TextField } from '../form-utils';
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: unknown) => void
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  {value: HealthCheckRating['Healthy'], label: 'Healthy'},
  {value: HealthCheckRating['LowRisk'], label: 'Low Risk'},
  {value: HealthCheckRating['HighRisk'], label: 'High Risk'},
  {value: HealthCheckRating['CriticalRisk'], label: 'Critical Risk'}
];

const entryTypeOptions: EntryTypeOption[] = [
  {value: 'HealthCheck', label: 'Health Check'},
  {value: 'Hospital', label: 'Hospital'},
  {value: 'OccupationalHealthcare', label: 'Occupational Healthcare'}
];

const AddEntryForm = ({onSubmit}: Props) => {

  const [{diagnoses}] = useStateValue();

  const isDate = (text: string): boolean => {
    return Boolean(Date.parse(text));
  };

  const showProperFields = (type: Entry['type']) => {
    switch(type) {
      case 'HealthCheck':
        return <>
          <SelectHealthCheckRatingField
            label='Health Check Rating'
            name='healthCheckRating'
            options={healthCheckRatingOptions}
          />
        </>;
      case 'Hospital':
        return <>
          <Field 
            label='Discharge Start Date'
            placeholder='YYYY/MM/DD'
            name='discharge.startDate'
            component={TextField}
          />
          <Field 
            label='Discharge End Date'
            placeholder='YYYY/MM/DD'
            name='discharge.endDate'
            component={TextField}
          />
        </>;
      case 'OccupationalHealthcare':
        return <>
          <Field 
            label='Employer Name'
            placeholder='Employer Name'
            name='employerName'
            component={TextField}
          />
          <Field 
            label='Sick Leave Start Date (Optional)'
            placeholder='YYYY/MM/DD'
            name='sickLeave.startDate'
            component={TextField}
          />
          <Field 
            label='Sick Leave End Date (Optional)'
            placeholder='YYYY/MM/DD'
            name='sickLeave.endDate'
            component={TextField}
          />
        </>;
    }
  };

  return <Formik
    initialValues={{
      type: 'HealthCheck' as Entry['type'],
      description: '',
      date: '',
      specialist: '',
      diagnosisCodes: [],
      healthCheckRating: HealthCheckRating['Healthy'],
      discharge: {
        startDate: '',
        endDate: ''
      },
      employerName: '',
      sickLeave: {
        startDate: '',
        endDate: ''
      }
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = 'Field is required.';
      const dateFormatError = 'Date should be in YYYY/MM/DD format.';
      const invalidDateError = 'Invalid date.';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let errors: any = {discharge: {}, sickLeave: {}};
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.date) {
        errors.description = requiredError;
      } else if (
        !/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/g.test(values.date)
      ) {
        errors.date = dateFormatError;
      } else if (!isDate(values.date)) {
        errors.date = invalidDateError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }

      if (values.type === 'Hospital') {
        if (!values.discharge.startDate) { 
          errors.discharge.startDate = requiredError;
        } else if (
          !/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/g.test(
            values.discharge.startDate
          )
        ) {
          errors.discharge.startDate = dateFormatError;
        } else if (!isDate(values.discharge.startDate)) {
          errors.discharge.startDate = invalidDateError;
        }

        if (!values.discharge.endDate) { 
          errors.discharge.endDate = requiredError;
        } else if (
          !/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/g.test(
            values.discharge.endDate
          )
        ) {
          errors.discharge.endDate = dateFormatError;
        } else if (!isDate(values.discharge.endDate)) {
          errors.discharge.endDate = invalidDateError;
        }
      }

      if (values.type === 'OccupationalHealthcare') {
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave.startDate !== '') {
          if (
            !/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/g.test(
              values.sickLeave.startDate
            )
          ) {
            errors.sickLeave.startDate = dateFormatError;
          } else if (!isDate(values.sickLeave.startDate)) {
            errors.sickLeave.startDate = invalidDateError;
          }
        }
        if (values.sickLeave.endDate !== '') {
          if (
            !/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/g.test(
              values.sickLeave.endDate
            )
          ) {
            errors.sickLeave.endDate = dateFormatError;
          } else if (!isDate(values.sickLeave.endDate)) {
            errors.sickLeave.endDate = invalidDateError;
          }
        }
      }

      if (
        Object.keys(errors.sickLeave).length === 0 &&
        Object.keys(errors.discharge).length === 0
      ) {
        errors = {};
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return errors;
    }}
  >
    {({isValid, values, setFieldValue, setFieldTouched}) => {
      return (
        <>
          <Header as='h3' content='Add Entry'/>
          <Form className='form ui'>
            <FormField>
              <SelectEntryTypeField 
                label='Entry Type'
                name='type'
                options={entryTypeOptions}
              />
            </FormField>
            <Field
              label='Entry Date'
              placeholder='YYYY/MM/DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            {showProperFields(values.type)}
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button
                  type='submit'
                  floated='left'
                  color='green'
                  disabled={!isValid}
                >
                Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        </>
      );
    }}
  </Formik>;
};

export default AddEntryForm;