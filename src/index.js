const tableBody = document.querySelector("#table-body");
const dogNameInputBdy = document.querySelector("#dog-form > input[type=text]:nth-child(1)");
const dogBreedInputBdy = document.querySelector("#dog-form > input[type=text]:nth-child(2)");
const dogSexInputBdy = document.querySelector("#dog-form > input[type=text]:nth-child(3)");
const dogInputSubmBtn = document.querySelector("#dog-form > input[type=submit]:nth-child(4)");

document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(kennelData => {
        kennelData.forEach((kennelDog) => {
            const tableRowContainer = document.createElement("tr");
            const dogNameTable = document.createElement("td");
            dogNameTable.id = "dog-name"
            dogNameTable.innerHTML = kennelDog.name
            const dogBreedTable = document.createElement("td");
            dogBreedTable.id = "dog-breed"
            dogBreedTable.innerHTML = kennelDog.breed
            const dogSexTable = document.createElement("td");
            dogSexTable.id = "dog-sex"
            dogSexTable.innerHTML = kennelDog.sex
            const dogEditBtn = document.createElement("button")
            dogEditBtn.id = "edit-button"
            dogEditBtn.innerText = "Edit"

            tableRowContainer.append(dogNameTable, dogBreedTable, dogSexTable, dogEditBtn);
            tableBody.append(tableRowContainer)

            dogEditBtn.addEventListener("click", () => {
                console.log("clicked")
                dogNameInputBdy.value = kennelDog.name
                dogBreedInputBdy.value = kennelDog.breed
                dogSexInputBdy.value = kennelDog.sex
                console.log(dogNameInputBdy.value)
                
                dogInputSubmBtn.addEventListener("click", (e) => {
                    e.preventDefault()
                    console.log("I was clicked!")
                    console.log(dogNameInputBdy.value)
                    const nameInput =dogNameInputBdy.value
                    const breedInput = dogBreedInputBdy.value
                    const sexInput = dogSexInputBdy.value
                    const dogId = kennelDog.id
                    console.log("name", nameInput, breedInput, sexInput, dogId)
                    const updateDogPost = {
                        method: 'PATCH',
                        headers: {
                            "Content-Type": 'application/json',
                            Accepts: "application/json"
                        },
                        body: JSON.stringify({
                            name: nameInput,
                            breed: breedInput,
                            sex: sexInput
                        })
                    }
                    fetch(`http://localhost:3000/dogs/${dogId}`, updateDogPost)
                   .then(resp => resp.json())
                   .then(newData => {
                    dogNameTable.innerHTML = newData.name;
                    dogBreedTable.innerHTML = newData.breed;
                    dogSexTable.innerHTML = newData.sex;
                   })
                    
                })
            })
        })
    })
})