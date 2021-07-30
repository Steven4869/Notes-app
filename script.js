//Javascript for the index.html
console.log("This is a notes app.");
showNotes();

let btn = document.getElementById("btn"); //id btn taken from element to make changes in there
btn.addEventListener("click", function (e) {         //click event listener is added so when someone clicks button it'll perform action
    let addTxt = document.getElementById("addTxt");   
    let notes = localStorage.getItem("notes");       
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);  //converts string to objects, mostly array
    }
    notesObj.push(addTxt.value);  //push will increment the notes in array formed 
    localStorage.setItem("notes", JSON.stringify(notesObj));  //update local storage and convert it into string with stringify
    addTxt.value = "";
    showNotes();  //initiate ShowNotes function to display the notes
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <img src="https://images.unsplash.com/photo-1626264146563-655be5b7d9c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80" class="card-img-top" alt="image">
                        <h5 class="card-title">Note ${index + 1}</h5>  
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById("notes");  
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;   //if notes exist then print the html 
    } else {
        notesElm.innerHTML = `No notes available. Please type your notes on "Add a note" section`;
    } //if not then print the message 
}

// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

