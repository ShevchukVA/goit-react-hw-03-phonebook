import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';

export default class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedLocalStorageContacts = localStorage.getItem('contacts');

    if (savedLocalStorageContacts) {
      this.setState({
        contacts: JSON.parse(savedLocalStorageContacts),
      });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    if (name === '' || number === '') {
      return contact;
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, contact],
        };
      });
    }
  };

  handleRemoveContact = idContact => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== idContact,
        ),
      };
    });
  };

  handleFilterContacts = filter => {
    this.setState({ filter });
  };

  handleShowFilterContact = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  handleBanContact = ({ name }) => {
    
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.map(contact => {
          if (contact.name.toLowerCase() === name.toLowerCase()) {
            alert(`${name} is already in contacts.`);            
          }
          return contact;
        }),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.handleShowFilterContact();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onAddContact={this.handleAddContact}
          onBanContact={this.handleBanContact}
        />
        <h2>Contacts</h2>
        {contacts.length > 0 && (
          <Filter value={filter} onChangeFilter={this.handleFilterContacts} />
        )}
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={this.handleRemoveContact}
        />
      </div>
    );
  }
}
