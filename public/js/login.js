window.onload = async() => {
    const loggedIn = await cookieExists();
    if (loggedIn) {
        window.location.href = "/user";
    } else {
        document.getElementById('submit').addEventListener('click', (e) => {
            e.preventDefault()
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            const data = {
                email: email,
                password: password,
            }
            const params = {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            fetch("/login", params)
                .then(rep => rep.text())
                .then(data => console.log(data))
                .catch(err => console.log(err))
        })

    }
}