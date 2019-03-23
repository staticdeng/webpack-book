function timeOut() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('setTimeout')
        }, 1000)
    })
}
timeOut().then(result => {
    console.log(result);
})