window.onload = async() => {
    const loggedIn = await cookieExists();
    if (loggedIn) {
        window.location.href = "/user";
    } else {
        document.getElementById('submit').addEventListener('click', (e) => {
            e.preventDefault();
            const name = document.querySelector("#name").value;
            const email = document.querySelector("#email").value;
            const number = document.querySelector("#number").value;
            const address = document.querySelector("#address").value;
            const age = document.querySelector("#age").value;
            const password = document.querySelector("#password").value;
            const confpassword = document.querySelector("#confpassword").value;
            const data = {
                name: name,
                email: email,
                number: number,
                address: address,
                age: age,
                password: password,
                confpassword: confpassword,
            }
            const params = {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
            }
            fetch("/register", params)
                .then(response => response.text())
                .then((data) => {
                    console.log(data)
                })
                .catch(err => console.log(err))
                // console.log(data)
        })
    }
}