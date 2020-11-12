import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

import { TWilder } from '../types';
import { gql, useMutation } from "@apollo/client";

type FormSubmissionInfo = {
  status: 'success' | 'failure';
  message: string
} | null

const CREATE_WILDER = gql`
  mutation CreateWilder($input: InputWilder!){
      createWilder(inputWilder: $input){
          id
          name
      }
  }
`

const useCreateWilderForm = (onSuccess: (wilder: TWilder) => void): [string, (name: string) => void, string, (name: string) => void, boolean, FormSubmissionInfo, () => Promise<void>] => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [formSubmissionInfo, setFormSubmissionInfo] = useState<FormSubmissionInfo>(null);
  const [createWilder, {loading, error}] = useMutation(CREATE_WILDER)

  const updateName = (name: string): void => {
    setFormSubmissionInfo(null);
    setName(name);
  };

  const updateCity = (city: string): void => {
    setFormSubmissionInfo(null);
    setCity(city);
  };

  const submitForm = async (): Promise<void> => {
    try {
      const newWilder = await createWilder({
        variables: {
          input: {
            name,
            city
          }
        }
      })
      setName("");
      setCity("");
      setFormSubmissionInfo({
        status: "success",
        message: "Wilder created successfully.",
      });
    } catch (error) {
      setFormSubmissionInfo({
        status: "failure",
        message: "Could not create wilder.",
      });
    }
  };

  return [
    name,
    updateName,
    city,
    updateCity,
    loading,
    formSubmissionInfo,
    submitForm,
  ];
};

type CreateWilderFormProps = {
  onSuccess: (wilder: TWilder) => void
}

const CreateWilderForm = ({ onSuccess }: CreateWilderFormProps): JSX.Element => {
  const [
    name,
    updateName,
    city,
    updateCity,
    loading,
    formSubmissionInfo,
    submitForm,
  ] = useCreateWilderForm(onSuccess);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        submitForm();
      }}
    >
      <label htmlFor="wilder-name">
        Name:{" "}
        <input
          id="wilder-name"
          type="text"
          name="wilder-name"
          value={name}
          autoFocus
          onChange={(event) => {
            updateName(event.target.value);
          }}
        />
      </label>
      <br />
      <label htmlFor="wilder-city">
        City:{" "}
        <input
          id="wilder-city"
          type="text"
          name="wilder-city"
          value={city}
          onChange={(event) => {
            updateCity(event.target.value);
          }}
        />
      </label>
      <br />
      <input type="submit" disabled={loading} />
      {loading && <Loader type="Puff" color="#000" height={25} width={25} />}
      {formSubmissionInfo && <span>{formSubmissionInfo.message}</span>}
    </form>
  );
};

export default CreateWilderForm;
