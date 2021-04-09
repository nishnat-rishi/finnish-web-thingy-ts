import { ErrorMessage, Field, FormikProps } from 'formik';
import React from 'react';

import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { Diagnosis, Entry, HealthCheckRating } from '../types';

export interface HealthCheckRatingOption {
  value: HealthCheckRating
  label: string
}

export interface EntryTypeOption {
  value: Entry['type']
  label: string
}

interface SelectEntryTypeFieldProps {
  name: string
  label: string
  options: EntryTypeOption[]
}

export const SelectEntryTypeField = ({
  name,
  label,
  options
}: SelectEntryTypeFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as='select' name={name} className='ui dropdown'>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface SelectHealthCheckRatingFieldProps {
  name: string
  label: string
  options: HealthCheckRatingOption[]
}

export const SelectHealthCheckRatingField = ({
  name,
  label,
  options
}: SelectHealthCheckRatingFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as='select' name={name} className='ui dropdown'>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[]
  setFieldValue: FormikProps<{ diagnosisCodes: Array<Diagnosis['code']> }>['setFieldValue']
  setFieldTouched: FormikProps<{ diagnosisCodes: Array<Diagnosis['code']> }>['setFieldTouched']
}) => {
  const field = 'diagnosisCodes';
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        placeholder='Diagnoses'
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
