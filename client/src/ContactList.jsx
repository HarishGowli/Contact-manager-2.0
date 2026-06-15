import React, { useMemo, useState } from "react";

const ContactList = ({ contacts, onDelete, onEdit }) => {
  const [query, setQuery] = useState("");

  const filteredContacts = useMemo(() => {
    const lower = query.toLowerCase();
    return contacts.filter((contact) =>
      [contact.name, contact.phone, contact.email]
        .join(" ")
        .toLowerCase()
        .includes(lower)
    );
  }, [contacts, query]);

  return (
    <div className="contact-list">
      <div className="search-bar">
        <input
          type="search"
          value={query}
          placeholder="Search contacts..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="contact-cards">
        {filteredContacts.map((contact) => (
          <article className="contact-card" key={contact._id}>
            <div className="contact-avatar">
              {contact.name ? contact.name.charAt(0).toUpperCase() : "?"}
            </div>

            <div className="contact-info">
              <p className="contact-name">{contact.name}</p>
              <p className="contact-meta">
                {contact.phone} · {contact.email}
              </p>
            </div>

            <div className="contact-actions">
              <button
                type="button"
                className="btn-icon edit"
                onClick={() => onEdit(contact)}
                aria-label={`Edit ${contact.name}`}
              >
                ✏️
              </button>
              <button
                type="button"
                className="btn-icon delete"
                onClick={() => onDelete(contact._id)}
                aria-label={`Delete ${contact.name}`}
              >
                🗑️
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
