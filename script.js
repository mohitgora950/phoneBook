let selectedContactId = null;
let contacts = [];


document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded, initializing contacts...");
    const storedContacts = localStorage.getItem("contacts");
    contacts = storedContacts ? JSON.parse(storedContacts) : [];
    console.log("Loaded contacts:", contacts);
    viewContacts();
});


function addContact() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !phone) {
        alert("Name and Phone Number are required!");
        return;
    }

    const id = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    const newContact = { id, name, phone, email };
    contacts.push(newContact);
    updateLocalStorage();

    alert("Contact added successfully!");
    clearForm();
    viewContacts();
}


function viewContacts() {
    console.log("viewContacts called");
 const tableBody = document.getElementById("contactTableBody");
    if (!tableBody) {
        console.error("Table body element not found!");
        return;
    }

    tableBody.innerHTML = ""; // Clear table

    if (contacts.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = <td colspan="5">No contacts found.</td>;
        tableBody.appendChild(row);
        return;
    }

    contacts.forEach(contact => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${contact.id}</td>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email || ""}</td>
            <td>
                <button class="edit-btn" onclick="editContact(${contact.id})">Edit</button>
                <button class="delete-btn" onclick="deleteContact(${contact.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editContact(id) {
    const contact = contacts.find(c => c.id === id);
    if (!contact) {
 console.error("Contact not found for editing:", id);
        return;
    }

    document.getElementById("name").value = contact.name;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email || "";
    selectedContactId = id;
}


function updateContact() {
    if (!selectedContactId) {
        alert("Please select a contact to update!");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !phone) {
        alert("Name and Phone Number are required!");
        return;
    }

    const index = contacts.findIndex(c => c.id === selectedContactId);
    if (index === -1) {
        console.error("Contact not found for update:", selectedContactId);
        return;
    }

    contacts[index] = { id: selectedContactId, name, phone, email };
    updateLocalStorage();

    alert("Contact updated successfully!");
    clearForm();
    viewContacts();
}


function deleteContact(id) {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    contacts = contacts.filter(c => c.id !== id);
    updateLocalStorage();

    alert("Contact deleted successfully!");
    clearForm();
    viewContacts();
}

function saveContact() {
    if (selectedContactId) {
        updateContact();
    } else {
        addContact();
    }
}


function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    selectedContactId = null;
}

function updateLocalStorage() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}


