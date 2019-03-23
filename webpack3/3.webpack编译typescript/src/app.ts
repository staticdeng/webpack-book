interface Cat {
    name: String,
    gender: String
}

function touchCat(cat: Cat) {
    console.log(cat.name, cat.gender);
}

touchCat({
    name: 'Tom',
    gender: 'male'
});