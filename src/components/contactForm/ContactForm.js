import React, { Component } from 'react';
import styles from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: ''   
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
    this.props.onBanContact(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onAddContact(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit} className={styles.container}>
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              type="name"
              name="name"
              value={name}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </label>
          <label className={styles.label}>
            Number
            <input
              className={styles.input}
              type="number"
              name="number"
              value={number}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </label>
          <button type="submit" className={styles.button}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
