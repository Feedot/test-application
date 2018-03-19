import RangeSlider from '../components/RangeSlider'
import DropMenu from "../components/dropMenu";

export default class Filter{
    constructor(){
        this.objSex = {
            arr:["Девушку","Парня"],
            src: 'down_more.png',
            className:"drop_menu_item",
            classActive:"drop_menu_item_active",
            key:1
        },
        this.objCity={
            arr:["Все(города)","Санкт-Петербург","Самара","Ростов-на-Дону","Чебоксары","Москва","Казань","Зеленоград"],
            src: 'down_more.png',
            className:"drop_menu",
            classActive:"drop_menu_active",
            key:0
        }
    }
    build(){
        this.createSexMenu = new DropMenu(this.objSex);
        this.createCityMenu = new DropMenu(this.objCity);
        this.createSexMenu.build();
        this.createCityMenu.build();
        this.Slider = new RangeSlider();
    }
    getData(){
        return {
            sex:this.createSexMenu.active,
            city:this.createCityMenu.active,
            years:this.Slider.data
        }
    }
}