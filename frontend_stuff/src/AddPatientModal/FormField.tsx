import React from 'react';
import {  Field } from 'formik';
import { Form } from 'semantic-ui-react';
import { Gender } from '../types';

// structure of a single option
export interface GenderOption {
  value: Gender
  label: string
}

// props for select field component
interface SelectGenderFieldProps {
  name: string
  label: string
  options: GenderOption[]
}

export const SelectGenderField = ({
  name,
  label,
  options
}: SelectGenderFieldProps) => (
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