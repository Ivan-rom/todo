const todoForm = document.querySelector('.create__form');
const author = document.getElementById('author');
const post = document.getElementById('post');
const todoList = document.querySelector('.todo__list');
let countAll = document.querySelector('.count');


const base = {
    todo: getTodoLS(),
    check(id) {
        for (let i = 0; i < base.todo.length; i++) {
            if (base.todo[i].id === id) {
                base.todo[i].ready = true;
            }            
        }
    },
    checkDel(idDel) {
        for (let i = 0; i < base.todo.length; i++) {
            if (base.todo[i].id === idDel) {
                base.todo.splice(i, 1);
            }            
        }
    },
    addTodo(author, post) {
        const todo = {
            id: `td` + (base.todo.length + 1),
            author,
            post,
            ready: false,
        };

        base.todo.push(todo);

        return(todo);
    }
}



function addTodo(event) {
    event.preventDefault();
    
    const authorText = author.value;
    const postText = post.value;

    const objTodo = base.addTodo(authorText, postText);

    const todoLi = createTodo(objTodo);
    todoList.append(todoLi);
    setTodoLS();
    todoForm.reset();
}

function createTodo(objTodo) {
    const todoItem = `
    <li class="todo__element post ${objTodo.ready ? 'post__completed' : ''}" >
        <article>
            <h3 class="post__author">${objTodo.author}</h3>
            <p class="post__todo">${objTodo.post}</p>
            ${!objTodo.ready ?
                `<button
                class="post__ready"
                data-id="${objTodo.id}"
                type="button">✓</button>`
                :
                `<button
                class="post__del"
                data-id="${objTodo.id}"
                type="button">✖</button>`}
        </article>
    </li>
    `
    const li = document.createElement('li');
    li.innerHTML = todoItem;
    
    return li;
}

function rendTodo() {
    for (let i = 0; i < base.todo.length; i++) {
        const todoLi = createTodo(base.todo[i]);
        todoList.append(todoLi);
    }
}

function changeBtn(btn) {
    const postDel = btn.closest('.post__completed');
    if (postDel) {
        btn.classList.remove('post__ready');
        btn.classList.add('post__del');
        btn.textContent = "✖";
    }
}

function checkTodo(event) {
    const btn = event.target.closest('.post__ready');

    if (btn) {
        const post = btn.closest('.post');
        const id = btn.dataset.id;
        base.check(id);
        setTodoLS();
        post.classList.add('post__completed');
        changeBtn(btn);
    }
}

function deleteTodo(event) {
    const btnDel = event.target.closest('.post__del');

    if (btnDel) {
        const postDel = btnDel.closest('.post__completed');
        if (postDel) {
            console.log(postDel);
        }
        const postToDel = postDel.closest('.post__completed');
        const elToDel = postDel.parentElement;
        elToDel.remove();
        const idDel = btnDel.dataset.id;
        base.checkDel(idDel);
        setTodoLS();
    }
}

function getTodoLS() {
    if (localStorage.getItem('todo')) {
        return JSON.parse(localStorage.getItem('todo'));
    }
    
    return [];
}

function setTodoLS() {
    localStorage.setItem('todo', JSON.stringify(base.todo));
    changeCount();
}

function changeCount() {
    countAll.textContent = base.todo.length;
}

changeCount();

rendTodo();
todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', deleteTodo);
todoList.addEventListener('click', checkTodo);