function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function delLink(id) {
  chrome.storage.sync.get("links", ({ links }) => {
    let linksParsed = JSON.parse(links);

    let filteredLinks = linksParsed.filter(item => item.id !== id)

    chrome.storage.sync.set({ links: JSON.stringify(filteredLinks) });

    renderLinks();
  });

}


const addNew = document.getElementById("addNew");

function addLink() {
  chrome.storage.sync.get("links", ({ links }) => {
    let linksParsed = JSON.parse(links);

    linksParsed.push({
      id: 'ogsdfgdsfgsgfdjgfdsk',
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

      const buttonWrapper = document.createElement('div')
      buttonWrapper.classList.add('buttonWrapper')

      const attribute = document.createElement("a");
      attribute.href = linksParsed[i].link;
      attribute.target = "_blank"

      if (linksParsed[i].link.length >= 40) {
        attribute.innerText = String(linksParsed[i].link).slice(0,40) + '...';
      } else {
        attribute.innerText = linksParsed[i].link;
      }

      buttonWrapper.appendChild(attribute);

      const delButton = document.createElement("button");
      delButton.classList.add('delLink');
      delButton.innerText = "delete"
      delButton.addEventListener("click", (() => {
        delLink(linksParsed[i].id)


      }))
      buttonWrapper.appendChild(delButton)

      node.appendChild(buttonWrapper)


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
