window.onload = () => {
    const loginlink = document.getElementById("login")
    const userlink = document.getElementById("user")
    const logoutlink = document.getElementById("logout")
    const registerlink = document.getElementById("register")
    const params = {
        method: 'post',
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify({ data: "umm yeah something" })
    }
    fetch("/isCookieThere", params)
        .then(response => response.text())
        .then(data => {
            if (data == "") {
                logoutlink.style.display = "none"
                userlink.style.display = "none"
                loginlink.style.display = "inline"
                registerlink.style.display = "inline"
            } else {
                logoutlink.style.display = "inline"
                userlink.style.display = "inline"
                loginlink.style.display = "none"
                registerlink.style.display = "none"
            }
        })
        .catch(err => console.error(err))
}