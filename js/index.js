const links = document
    .querySelector('#links').children;

var basergb = [157, 78, 221];
/* the percentage to increase for each gradient */

for(let i = 0; i < links.length; i++){
    changeLinkBgColor(i);
    let prevW = links[i].style.width;
    links[i].addEventListener('mouseover', function(){
        links[i].style.backgroundColor = 'var(--grad2)';
        links[i].style.width = '85vw';
        links[i].style.boxShadow = "5px 10px 10px var(--grad4)";
    })
    links[i].addEventListener('mouseout',function(){
        changeLinkBgColor(i);
        links[i].style.width = prevW;
        links[i].style.boxShadow = "none";
    })
}

function changeLinkBgColor(i){
    var percent = 0.5 - ((1/(links.length+1)) * i);
    var rgb = basergb.map(basergb => lerp(basergb, percent));
    links[i].style.backgroundColor = `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;
}

function lerp(min, percent){
    return ((225 - min) * percent + min);
}


