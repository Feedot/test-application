import  loadImages  from "../functions/loadImages"

export default class GenerateImageList{
    constructor(){
        this.data = ['image_list_1.png','image_list_2.png', 'image_list_3.png','image_list_4.png','image_list_5.png','image_list_6.png','image_list_7.png','image_list_8.png']
        this.images = loadImages (require.context("../../images/image_list", false, /\.(png|jpe?g|svg)$/));
    }
    build(){
        let { images, data } = this,
            template = document.createElement('div');
            template.innerHTML = data.reduce( (str,item) => str += `<img src=${images[item]}>`,"");
            return template;
    }
}
