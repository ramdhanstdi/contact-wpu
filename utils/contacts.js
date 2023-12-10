const fs = require('fs');
const path = require('path');

const dirPath = './data';
const dataPath = path.join(dirPath, 'contacts.json');

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

if (!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}
//ambil semua data contact.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync(dataPath, 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
};

// cari contact berdasarkan nama 
const findContact = (nama) => {
        const contacts = loadContact();
        const contact = contacts.find((contact) => contact.nama.toLowerCase() == nama.toLowerCase());
        return contact;
};

module.exports = { loadContact, findContact };
