window.onload = () => {
    updateNavbar()

    fetch("/user", {
            method: 'post'
        })
        .then(rep => rep.json())
        .then(data => {
            document.getElementById("name").innerText = data.name
            document.getElementById("age").innerText = data.age
            document.getElementById("number").innerText = data.number
            document.getElementById("email").innerText = data.email
            document.getElementById("address").innerText = data.address
        })
        .catch(err => console.log(err))


}