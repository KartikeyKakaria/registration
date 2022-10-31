window.onload = () => {
    fetch("/user", {
            method: 'post'
        })
        .then(rep => rep.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

}