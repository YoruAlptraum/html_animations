const links = document.querySelector('#links').querySelector("ol").children;
console.log(links.length)

rgb = [157, 78, 221]

for(let i = 1; i < links.length; i++){
    var percent = 1/links.length * i;
    for(let j = 0; j < rgb.length; j++){
        console.log(lerp(rgb[j], percent));
    }
}

function lerp(min, percent){
    return ((225 - min) * percent + min);
}