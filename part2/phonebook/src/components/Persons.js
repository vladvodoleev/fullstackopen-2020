import React from "react";

const Persons = ({ persons,handleDeletePerson }) => {
  return (
    <>
      {persons.map(person => (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handleDeletePerson(person.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
