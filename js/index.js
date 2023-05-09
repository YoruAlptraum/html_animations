const links = document.querySelector('#links').querySelector("ol").children;
console.log(links.length)

rgb = [157, 78, 221]

for(let i = 0; i <= links.length; i++){
    var percent = 1/(links.length+1) * (i+1);
/*     for(let j = 0; j < rgb.length; j++){
        console.log(lerp(rgb[j], percent));
    } */
    rgb = rgb.map(rgb => lerp(rgb, percent));
    links[i].style.backgroundColor = `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;
}

function lerp(min, percent){
    return ((225 - min) * percent + min);
}