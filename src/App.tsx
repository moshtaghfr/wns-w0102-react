import React, { useState } from "react";
import Loader from "react-loader-spinner";
import { useQuery, gql } from '@apollo/client';

import "./App.css";
import { TWilder } from './types';
import { Container } from "./components/Styled";
import Wilder from "./components/Wilder";
import CreateWilderForm from "./components/CreateWilderForm";

const FETCH_WILDERS = gql`
  query FetchWilders {
    wilders {
      id
      name
      city
      skills {
        id
        title
        voteCount
      }
    }
  }
`

function App() {
  const {loading, error, data} = useQuery(FETCH_WILDERS);

  const [
    shouldDisplayCreateWilderForm,
    setShouldDisplayCreateWilderForm,
  ] = useState(false);

  const addNewWilder = (newWilder: TWilder) => {
    // setWilders([...wilders, newWilder]);
  };

  return (
    <>
      <header>
        <Container>
          <h1>Wilders Book</h1>
        </Container>
      </header>
      <main className="container">
        {shouldDisplayCreateWilderForm && (
          <CreateWilderForm onSuccess={addNewWilder} />
        )}
        <button
          onClick={() => {
            setShouldDisplayCreateWilderForm(!shouldDisplayCreateWilderForm);
          }}
        >
          {`${shouldDisplayCreateWilderForm ? "Hide" : "Show"
            } create wilder form`}
        </button>
        <h2>Wilders</h2>
        {error ? error.message : loading ? (
          <Loader type="Puff" color="#000" height={50} width={50} />
        ) : (
            <section className="card-row">
              {data.wilders.map((wilder: TWilder) => (
                <Wilder
                  key={wilder.name}
                  name={wilder.name}
                  skills={wilder.skills}
                />
              ))}
            </section>
          )}
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2020 Wild Code School</p>
        </div>
      </footer>
    </>
  );
}

export default App;
