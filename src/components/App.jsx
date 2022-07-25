import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList';
import { useSelector, useDispatch } from 'react-redux';
import Filter from './Filter';

import { add, remove } from '../redux/contacts/contacts-slice';
import { toFilter } from '../redux/filter/filter-slice';
import { getContacts } from '../redux/contacts/contacts-selector';
import { getFilter } from '../redux/filter/filter-selector';

export default function App() {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onAddContact = data => {
    if (contacts.some(el => el.name === data.name)) {
      return alert(`${data.name} is already in contacts.`);
    }
    const action = add(data);
    dispatch(action);
  };

  const onRemoveContact = id => {
    dispatch(remove(id));
  };

  const handleFilter = ({ target }) => dispatch(toFilter(target.value));

  const getFilteredContact = () => {
    if (!filter) {
      return contacts;
    }
    const filterValue = filter.toLowerCase();
    const filterContact = contacts.filter(({ name }) => {
      const nameContact = name.toLowerCase();
      return nameContact.includes(filterValue);
    });
    return filterContact;
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onAddContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilter} />
      <ContactList
        contacts={getFilteredContact()}
        removeContact={onRemoveContact}
      />
    </div>
  );
}
