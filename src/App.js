import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

import "./App.css";
import { Container } from "./components/Styled";
import Wilder from "./components/Wilder";
import CreateWilderForm from "./components/CreateWilderForm";

function App() {
  const [loading, setLoading] = useState(true);
  const [wilders, setWilders] = useState([]);
  const [
    shouldDisplayCreateWilderForm,
    setShouldDisplayCreateWilderForm,
  ] = useState(false);

  useEffect(() => {
    const fetchWilders = async () => {
      try {
        const result = await axios("/api/wilders");
        const { wilders } = result.data;
        setWilders(wilders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWilders();
  }, []);

  return (
    <>
      <header>
        <Container>
          <h1>Wilders Book</h1>
        </Container>
      </header>
      <main className="container">
        {shouldDisplayCreateWilderForm && <CreateWilderForm />}
        <button
          onClick={() => {
            setShouldDisplayCreateWilderForm(!shouldDisplayCreateWilderForm);
          }}
        >
          {`${
            shouldDisplayCreateWilderForm ? "Hide" : "Show"
          } create wilder form`}
        </button>
        <h2>Wilders</h2>
        {loading ? (
          <Loader type="Puff" color="#000" height={50} width={50} />
        ) : (
          <section className="card-row">
            {wilders.map((wilder) => (
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
