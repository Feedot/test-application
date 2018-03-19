import  ImageList  from '../components/generateImageList'
import PersonList from "../containers/PersonList"
import scrollTop from '../functions/scrollTop'

export default class App{
    constructor(data){
        this.data = data;
        this.imageList = document.querySelector('.images_list');
    }
    initializating(){
        this.imageList.appendChild(new ImageList().build());
        new PersonList(this.data).initFilters()
        this.actions()
    }
    actions(){
        let buttonMenu = document.querySelector('.button_menu'),
            toUp = document.getElementById('toUp');

        buttonMenu.onclick = () => {
            let nav = document.querySelector('header');
            (nav.className==="") ? nav.className= 'active': nav.className = "";
        }

        window.onscroll = (e)=>{
            let correctScroll = e.target.scrollingElement.scrollTop;
            (correctScroll < 400 ) ? toUp.className = 'to_up' : toUp.className = 'to_up active';
        }
        toUp.onclick = () => scrollTop();
    }
}