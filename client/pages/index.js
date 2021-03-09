import { useState } from "react";

export default function Home() {
  const [passwordName, setPasswordName] = useState("");
  const [passwordDoc, setPasswordDoc] = useState(null);

  async function Home() {
    const [passwordName, setPasswordName] = useState("");
    const [passwordDoc, setPasswordDoc] = useState(null);
    async function handleSubmit(event) {
      event.preventDefault();
      const result = await fetch(
        `http://localhost:3001/api/passwords/${passwordName}`
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
          <button type="submit">Senden</button>
        </form>
        {passwordDoc && (
          <>
            {passwordDoc.name} {passwordDoc.value}
          </>
        )}
      </>
    );
  }
}
