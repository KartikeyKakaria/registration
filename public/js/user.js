window.onload = () => {
    console.log(cookieExists);
    if (cookieExists()) {
        fetch("/user", {
                method: 'post'
            })
            .then(rep => rep.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    } else {
        window.location.href = "/login";
    }

}