const links = document.querySelector('#links').querySelector("ol").children;
console.log(links.length)

rgb = [157, 78, 221]
/* the percentage to increase for each gradient */
var percent = (1/(links.length+1));

for(let i = (links.length-1); i >= 0; i--){
    rgb = rgb.map(rgb => lerp(rgb, percent));
    links[i].style.backgroundColor = `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;
}

function lerp(min, percent){
    return ((225 - min) * percent + min);
}