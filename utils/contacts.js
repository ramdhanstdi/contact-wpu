const fs = require("fs");
const path = require("path");

const dirPath = "./data";
const dataPath = path.join(dirPath, "contacts.json");

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}
//ambil semua data contact.json
const loadContact = () => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() == nama.toLowerCase()
  );
  return contact;
};

// menuliskan / menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// menambahkan data contact baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// cek nama duplikat yang ada di contacts.json
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

// hapus kontak
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
  saveContacts(filteredContacts);
};

// edit kontak
const updateContact = (contactBaru) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter(
    (contact) => contact.nama !== contactBaru.oldnama
  );
  delete contactBaru.oldnama;

  filteredContacts.push(contactBaru);
  saveContacts(filteredContacts);
};

module.exports = {
  loadContact,
  findContact,
  saveContacts,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact,
};
