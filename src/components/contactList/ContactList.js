import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onRemoveContact }) => (
  <>
    {contacts.length > 0 && (
      <ul className={styles.list}>
        {contacts.map(({ id, name, number }) => (
          <li key={id} className={styles.item}>
            <p className={styles.text}>
              {name}: {number}
            </p>
            <button
              className={styles.button}
              type="button"
              onClick={() => onRemoveContact(id)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    )}
  </>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};
export default ContactList;
