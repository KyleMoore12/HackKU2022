const urlInput = document.getElementById('urlInput');
const descriptionInput = document.getElementById('descriptionInput');
const todosInput = document.getElementById('todosInput');
const submitButton = document.getElementById('addSubmitButton');
const addNewModal = document.getElementById('addModal');
const addNew = document.getElementById("addNew");
const addModalForm = document.getElementById("addModalForm");


function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function randomId() {
  let timestamp = (new Date().getTime() / 1000 | 0).toString(16);

  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
}


function delLink(id) {
  chrome.storage.sync.get("links", ({ links }) => {
    let linksParsed = JSON.parse(links);

    let filteredLinks = linksParsed.filter(item => item.id !== id)

    chrome.storage.sync.set({ links: JSON.stringify(filteredLinks) });

    renderLinks();
  });

}


function addLink(url, description, todos) {
  chrome.storage.sync.get("links", ({ links }) => {
    let linksParsed = JSON.parse(links);

    linksParsed.push({
      id: randomId(),
      link: url,
      description,
      todos
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

      const deleteButtonWrapper = document.createElement('div');
      deleteButtonWrapper.classList.add('deleteButtonWrapper');

      const attribute = document.createElement("a");
      attribute.innerText = linksParsed[i].link;
      attribute.target = '_blank';
      attribute.href = linksParsed[i].link;
      deleteButtonWrapper.appendChild(attribute);

      const delButton = document.createElement("button");
      delButton.innerText = "delete"
      delButton.classList.add('delLink')
      delButton.addEventListener("click", (() => {
        delLink(linksParsed[i].id)
      }))
      deleteButtonWrapper.appendChild(delButton)

      node.appendChild(deleteButtonWrapper);

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
  addNewModal.style.opacity = '1';
  addNewModal.style.pointerEvents = 'auto';
})

addModalForm.addEventListener("submit", () => {
  addLink(urlInput.value, descriptionInput.value, [todosInput.value]);
  addNewModal.style.opacity = '0';
  addNewModal.style.pointerEvents = 'none';
})

renderLinks()
