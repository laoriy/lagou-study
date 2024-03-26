import { Link } from "gatsby";
import React from "react";

export default function Pokemon({
  pageContext: { person },
}: {
  pageContext: { person: { slug: string; age: number; name: string } };
}) {
  return (
    <div style={{ width: 960, margin: "4rem auto" }}>
      <h1>{person.slug}</h1>

      <h2>{person.age}</h2>
      <h2>{person.name}</h2>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
