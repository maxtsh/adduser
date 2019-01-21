class User {
    constructor(firstName , lastName , email , password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

class UI {
    addToTable(user){
        const row = document.createElement('tr');
        const rowCount = document.getElementById('tbody').childElementCount + 1;
        row.innerHTML = `
        <th class="row-counter" scope="row">${rowCount}</th>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td><a href="#" class="delete-user">X</a></td>`;
        document.getElementById('tbody').appendChild(row);
    }

    clearInputs(){
        const firstName = document.getElementById('firstname').value = '',
              lastName = document.getElementById('lastname').value = '',
              email = document.getElementById('email').value = '',
              password = document.getElementById('password').value = '';
    }

    deleteUsers(target){

        if(target.className === 'delete-user'){
            target.parentElement.parentElement.remove();
        }
    }
}

class Store {
    static getFromLs(){
        let users;
        if(localStorage.getItem('users') === null){
            users = [];
        }else{
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }

    static displayFromLs(){
        const users = Store.getFromLs();
        users.forEach(function(user){
            const ui = new UI();
            ui.addToTable(user);
        });
    }

    static addToLs(user){
        const users = Store.getFromLs();
        users.push(user);
        localStorage.setItem('users' , JSON.stringify(users));
    }

    static deleteFromLs(password , index){
        const users = Store.getFromLs();
        users.forEach(function(user){
            if(user.password === password){
                users.splice(index , 1);
            }
        });
        
        localStorage.setItem('users' , JSON.stringify(users));
    }   
}

// Loading The Users From LS
document.addEventListener('DOMContentLoaded' , function(){
    Store.displayFromLs();
});

// Submit Event Listener
document.getElementById('form').addEventListener('submit' , function(e){

    const firstName = document.getElementById('firstname').value,
          lastName = document.getElementById('lastname').value,
          email = document.getElementById('email').value,
          password = document.getElementById('password').value;

    const user = new User(firstName , lastName , email , password);
    const ui = new UI();

    ui.addToTable(user);
    Store.addToLs(user);

    ui.clearInputs();
    e.preventDefault();
});

// Delete Event Listener
document.querySelector('.table').addEventListener('click' , function(e){

    const ui = new UI();
    ui.deleteUsers(e.target);
    Store.deleteFromLs(e.target.parentElement.previousElementSibling.textContent);
    e.preventDefault();
});  