function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

const addNew = document.getElementById("addNew");

function addLink() {
  chrome.storage.sync.get("links", ({ links }) => {
    let linksParsed = JSON.parse(links);

    linksParsed.push({
      id: 'ojgfdsk',
      link: 'https://googleiuhhhjhjhjhjghjghgjjhg.com',
      description: "this is google",
      todos: ['check out google', 'testing']
    })

    chrome.storage.sync.set({ links: JSON.stringify(linksParsed) });

    renderLinks();
  });
}

const linkContainer = document.getElementById("linkContainer");

function renderLinks() {
  removeAllChildNodes(linkContainer);


  chrome.storage.sync.get("links", ({ links }) => {
    let linksParsed = JSON.parse(links);

    console.log(linksParsed)

    for (let i = 0; i < linksParsed.length; i++) {

      console.log(i, linksParsed[i])
      const node = document.createElement("div");

      const attribute = document.createElement("a");
      attribute.innerText = linksParsed[i].link;
      node.appendChild(attribute);

      const description = document.createElement("p");
      description.innerText = linksParsed[i].description;
      node.appendChild(description);

      const todoList = document.createElement("ul");

      for (let j = 0; j < linksParsed[i].todos.length; j++) {
        const todoDescription = document.createElement("li");
        todoDescription.innerText = linksParsed[i].todos[j];

        todoList.appendChild(todoDescription);


      }

      node.appendChild(todoList);


      linkContainer.appendChild(node);
    }
  });
}

addNew.addEventListener("click", () => {
  console.log('add new');
  addLink();
})


renderLinks()
