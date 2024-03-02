const fs = require('fs');
const path = require('path');
const http = require('http');

const fileName = path.join(__dirname, 'data.txt');

// Function to create a file with content
function create(content) {
  fs.writeFile(fileName, content, (err) => {
    if (err) throw err;
    console.log('File created successfully!');
  });
}

// Function to read content from a file
function read() {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) throw err;
    console.log('File content:');
    console.log(data);
  });
}

// Function to update content in a file 
function update(content) {
  fs.appendFile(fileName, content, (err) => {
    if (err) throw err;
    console.log('File updated successfully!');
  });
}

// Function to delete a file
function deleteFile() {
  fs.unlink(fileName, (err) => {
    if (err) throw err;
    console.log('File deleted successfully!');
  });
}

// Sample usage
create('Hello, this is a new file.\n');
read();
update('And here is some additional text.\n');
read();
deleteFile();

const { v4: uuidv4 } = require('uuid');

const FILE_PATH = 'data.json';

const createItem = (name) => {
  const data = loadItems();
  const newItem = { id: uuidv4(), name };
  data.push(newItem);
  saveItems(data);
  return newItem;
};

const readItem = (id) => {
  const data = loadItems();
  return data.find((item) => item.id === id);
};

const updateItem = (id, newName) => {
  const data = loadItems();
  const itemIndex = data.findIndex((item) => item.id === id);
  if (itemIndex >= 0) {
    data[itemIndex].name = newName;
    saveItems(data);
    return data[itemIndex];
  }
  return null;
};

const deleteItem = (id) => {
  const data = loadItems();
  const itemIndex = data.findIndex((item) => item.id === id);
  if (itemIndex >= 0) {
    const deletedItem = data.splice(itemIndex, 1)[0];
    saveItems(data);
    return deletedItem;
  }
  return null;
};

const loadItems = () => {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveItems = (items) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(items, null, 2));
};

const main = () => {
  const newItem = createItem('Item 1');
  console.log('Created Item:', newItem);

  const itemById = readItem(newItem.id);
  console.log('Read Item:', itemById);

  const updatedItem = updateItem(newItem.id, 'Updated Item 1');
  console.log('Updated Item:', updatedItem);

  const deletedItem = deleteItem(newItem.id);
  console.log('Deleted Item:', deletedItem);

  const deletedItem2 = deleteItem(newItem.id);
  console.log('Deleted Item that was already deleted:', deletedItem2);
};

main();

const server = http.createServer((request, response) => {
  console.log(request.url);
  response.end('Server is running!');
});

// Listening on port 5000
server.listen(5000);
