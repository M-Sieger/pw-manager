import { useState } from "react";
import styled from "styled-components";

const SubmitButton = styled.button`
  color: red;
  border-radius: 5px;
  border: solid red 1px;
`;

export default function Home() {
  const [passwordName, setPasswordName] = useState("");
  const [passwordDoc, setPasswordDoc] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    const result = await fetch(
      `http://localhost:3000/api/passwords/${passwordName}`
    );
    const passwordDoc = await result.json();
    setPasswordDoc(passwordDoc);
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          value={passwordName}
          onChange={(event) => setPasswordName(event.target.value)}
        />
        <SubmitButton type="submit">Senden</SubmitButton>
      </form>
      {passwordDoc && (
        <>
          {passwordDoc.name} {passwordDoc.value}
        </>
      )}
    </>
  );
}
