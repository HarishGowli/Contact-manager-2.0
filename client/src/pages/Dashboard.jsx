import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import ContactForm from "../ContactForm";
import ContactList from "../ContactList";
import { useToast } from "../context/ToastContext";
import "./dashboardfile.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  const logout = () => {
    localStorage.clear();
    showToast("Logged out successfully", "info");
    navigate("/", { replace: true });
  };

  const fetchContacts = async () => {
    if (!token) {
      logout();
      return;
    }

    try {
      const res = await API.get("/api/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts(res.data);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        logout();
      } else {
        showToast("Failed to load contacts", "error");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchContacts();
  }, [navigate, token]);

  const addContact = async (data) => {
    try {
      await API.post("/api/contacts", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast("Contact added successfully!", "success");
      fetchContacts();
    } catch (error) {
      showToast("Failed to add contact", "error");
    }
  };

  const deleteContact = async (id) => {
    try {
      await API.delete(`/api/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (editContact && editContact._id === id) {
        setEditContact(null);
      }
      showToast("Contact deleted successfully", "success");
      fetchContacts();
    } catch (error) {
      showToast("Failed to delete contact", "error");
    }
  };

  const updateContact = async (data) => {
    if (!editContact) return;

    try {
      await API.put(`/api/contacts/${editContact._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEditContact(null);
      showToast("Contact updated successfully!", "success");
      fetchContacts();
    } catch (error) {
      showToast("Failed to update contact", "error");
    }
  };

  const cancelEdit = () => {
    setEditContact(null);
  };

  return (
    <div className="dashboard-shell">
      <div className="dashboard-card">
        <header className="dashboard-topbar">
          <div className="dashboard-brand">
            <span className="brand-icon">📋</span>
            <div>
              <h2>Contact Manager</h2>
              <p>Welcome back, {userName}</p>
            </div>
          </div>

          <div className="dashboard-actions">
            <div className="user-pill">{userInitial}</div>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        </header>

        <div className="dashboard-grid">
          <section className="dashboard-panel dashboard-add">
            <div className="panel-heading">
              <div className="panel-heading-title">
                <span className="panel-icon">➕</span>
                <div>
                  <h3>Add new contact</h3>
                </div>
              </div>
            </div>

            <ContactForm
              onSubmit={editContact ? updateContact : addContact}
              existing={editContact}
              onCancel={cancelEdit}
            />
          </section>

          <section className="dashboard-panel dashboard-list">
            <div className="panel-heading">
              <div className="panel-heading-title">
                <span className="panel-icon">👥</span>
                <div>
                  <h3>Contacts</h3>
                </div>
              </div>
              <span className="contact-count">{contacts.length} contacts</span>
            </div>

            <ContactList
              contacts={contacts}
              onDelete={deleteContact}
              onEdit={setEditContact}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;