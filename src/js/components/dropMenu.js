
export default class DropMenu{
    constructor({arr,src,className,classActive,key}){
        this.items = arr;
        this.parent = document.querySelector('.flex_wrapper');
        this.slider = document.querySelector('.range_slider_wrapper');
        this.src = src;
        this.key = key;
        this.active = arr[0];
        this.class = className;
        this.activeClass = classActive;
    }
    build(){
        let template = document.createElement('div');
        template.className = "wrapper_drop"
            template.innerHTML = this.items.reduce((result,item,index) =>{
                result += `<div class=${this.active === item ? this.activeClass : this.class}>
                                ${this.active === item ? `${item}<img src=${this.src}>` : item }
                            </div>`
                return result;
            },'')
        if(this.key) this.parent.insertBefore(template,this.parent.firstChild)
        else this.parent.insertBefore(template,this.slider.parentNode);

        let items =  document.getElementsByClassName(this.class),
            activeClass = document.querySelector("."+this.activeClass)

        Array.from(items).map(item=>
                    item.onclick = () => {
                        this.active = item.innerHTML.replace(/\s/g,"");
                        this.reRender(template)
                    }
        );

        activeClass.onclick = () => {
            Array.from(items).map( item => { item.style.display = 'block' })
            activeClass.onclick = () => this.reRender(template)
        }
    }
    reRender(template){ this.parent.removeChild(template);this.build() }
}