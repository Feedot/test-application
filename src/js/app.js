'use strict';
import  GenerateImageList  from './components/generateImageList'
import PersonList from "./containers/PersonList"
import scrollTop from './functions/scrollTop'
import data from "../data/data"



let ImageList = new GenerateImageList(),
    buttonMenu = document.querySelector('.button_menu'),
    container = document.querySelector('.images_list').appendChild(ImageList.build());

buttonMenu.onclick = () => {
    let nav = document.querySelector('header');
    (nav.className==="") ? nav.className= 'active':nav.className = "";
}
const initPersonList = new PersonList(data)
initPersonList.initFilters()

window.onscroll = (e)=>{
    let correctScroll = e.target.scrollingElement.scrollTop,
        toUp = document.getElementById('toUp');
        (correctScroll < 400 ) ? toUp.className = 'to_up' : toUp.className = 'to_up active';
}

document.getElementById('toUp').onclick = () => scrollTop();






















