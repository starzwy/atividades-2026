let contacts = [];
let editingId = null;

// Elementos do DOM
const contactForm = document.getElementById('contactForm');
const filterInput = document.getElementById('filter');
const contactsBody = document.getElementById('contactsBody');
const totalCountSpan = document.getElementById('totalCount');

// Adicionar contato
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    if (editingId) {
        // Editar contato existente
        const index = contacts.findIndex(c => c.id === editingId);
        contacts[index] = { id: editingId, name, email, phone };
        editingId = null;
        document.querySelector('.btn-add').textContent = 'Adicionar contato';
    } else {
        // Adicionar novo contato
        const newContact = {
            id: Date.now(),
            name,
            email,
            phone
        };
        contacts.push(newContact);
    }
    
    contactForm.reset();
    renderContacts();
});

// Filtrar contatos
filterInput.addEventListener('input', () => {
    renderContacts();
});

// Renderizar contatos
function renderContacts() {
    const filterText = filterInput.value.toLowerCase();
    
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(filterText)
    );
    
    contactsBody.innerHTML = '';
    
    filteredContacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editContact(${contact.id})">Editar</button>
                <button class="btn-delete" onclick="deleteContact(${contact.id})">Excluir</button>
            </td>
        `;
        contactsBody.appendChild(row);
    });
    
    totalCountSpan.textContent = contacts.length;
}

// Editar contato
window.editContact = (id) => {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
        document.getElementById('name').value = contact.name;
        document.getElementById('email').value = contact.email;
        document.getElementById('phone').value = contact.phone;
        editingId = id;
        document.querySelector('.btn-add').textContent = 'Salvar alterações';
    }
};

// Excluir contato
window.deleteContact = (id) => {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
        contacts = contacts.filter(contact => contact.id !== id);
        renderContacts();
    }
};

// Renderizar contatos iniciais (exemplo)
contacts = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 88888-8888' },
    { id: 3, name: 'Pedro Oliveira', email: 'pedro@email.com', phone: '(11) 77777-7777' }
];

renderContacts();