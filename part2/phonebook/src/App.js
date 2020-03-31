import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phoneService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    phoneService.getAll().then(persons => setPersons(persons));
  }, []);

  const handleNameChange = event => setNewName(event.target.value);

  const handleNumberChange = event => setNewNumber(event.target.value);

  const handleFilterChange = event => setFilterWord(event.target.value);

  const updateNotification = message => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDeletePerson = id => {
    const personToDelete = persons.find(person => person.id === id);
    const result = window.confirm(`Delete ${personToDelete.name}`);
    if (result) {
      phoneService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          updateNotification({text: `Information of ${personToDelete.name} has already been removed from server`, type: "error"});
          setPersons(persons.filter(person => person.id !== personToDelete.id));
        });
    }
  };

  const addPerson = event => {
    event.preventDefault();
    const personIdx = persons.map(person => person.name).indexOf(newName);
    if (personIdx === -1) {
      const newPerson = { name: newName, number: newNumber};
      phoneService
      .create(newPerson)
        .then(newEntry => {
          updateNotification({text: `Added ${newEntry.name}`, type: "success"});
          setPersons(persons.concat(newEntry));
        })
        .catch(error => {
          updateNotification({text: error.response.data.error, type: "error"})
        });
    } else {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (result) {
        const newPerson = { ...persons[personIdx], number: newNumber };
        phoneService
          .update(newPerson)
          .then(newEntry => {
            updateNotification({text: `Updated ${newEntry.name} number`, type: "success"});
            setPersons(
              persons.map(person =>
                person.id === newPerson.id ? newEntry : person
              )
            );
          })
          .catch(error => {
            updateNotification({text: error.response.data.error, type: "error"})
          });
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterWord.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filterWord={filterWord} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={personsToShow}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
