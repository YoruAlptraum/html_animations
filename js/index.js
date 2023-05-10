const links = document
    .querySelector('#links')
    .querySelector("ol").children;

var basergb = [157, 78, 221]
/* the percentage to increase for each gradient */

for(let i = 0; i < links.length; i++){
    var percent = 0.5 - ((1/(links.length+1)) * i);
    var rgb = basergb.map(basergb => lerp(basergb, percent));
    links[i].style.backgroundColor = `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;
}

function lerp(min, percent){
    return ((225 - min) * percent + min);
}