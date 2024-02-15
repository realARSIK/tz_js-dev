function simulateAPIRequest() {
  return new Promise((resolve) => {
    const dataAPI = {
      "services": [
        { "id": 1, "head": null, "name": "Проф.осмотр", "node": 0, "price": 100.0, "sorthead": 20 },
        { "id": 2, "head": null, "name": "Хирургия", "node": 1, "price": 0.0, "sorthead": 10 },
        { "id": 3, "head": 2, "name": "Удаление зубов", "node": 1, "price": 0.0, "sorthead": 10 },
        { "id": 4, "head": 3, "name": "Удаление зуба", "node": 0, "price": 800.0, "sorthead": 10 },
        { "id": 5, "head": 3, "name": "Удаление 8ого зуба", "node": 0, "price": 1000.0, "sorthead": 30 },
        { "id": 6, "head": 3, "name": "Удаление осколка зуба", "node": 0, "price": 2000.0, "sorthead": 20 },
        { "id": 7, "head": 2, "name": "Хирургические вмешательство", "node": 0, "price": 200.0, "sorthead": 10 },
        { "id": 8, "head": 2, "name": "Имплантация зубов", "node": 1, "price": 0.0, "sorthead": 20 },
        { "id": 9, "head": 8, "name": "Коронка", "node": 0, "price": 3000.0, "sorthead": 10 },
        { "id": 10, "head": 8, "name": "Слепок челюсти", "node": 0, "price": 500.0, "sorthead": 20 }
      ]
    };

    resolve(dataAPI);
  });
}


function buildTree(data) {
  const tree = document.getElementById('tree');

  if (!tree) {
    console.error('Элемент с ID "tree" не найден');
    return;
  }

  const services = data.services;

  services.sort((a, b) => a.sorthead - b.sorthead);

  const createNode = (node) => {
    const item = document.createElement('div');

    item.textContent = `${node.name}${node.price !== 0 ? ` (${node.price})` : ''}`;

    if (node.node === 1) {
      const sublist = document.createElement('div');
      sublist.classList.add('nested');
      sublist.style.paddingLeft = '20px';

      services.filter(s => s.head === node.id)
        .forEach(childNode => {
          return sublist.appendChild(createNode(childNode))
        });

      item.appendChild(sublist);

      if (sublist.children.length > 0) {
        item.classList.add('caret');
        item.addEventListener('click', (event) => {
          if (event.target === item) {
            sublist.classList.toggle('active');
            item.classList.toggle('caret-down');
          }
          event.stopPropagation();
        });
      }
    } else {
      item.style.cursor = 'pointer';
    }

    return item;
  }

  services.filter(s => s.head === null)
    .forEach(node => {
      return tree.appendChild(createNode(node));
    });
}


simulateAPIRequest()
  .then(data => {
    buildTree(data);
  })
  .catch(error => console.error('Возникла ошибка при имитации запроса:', error));