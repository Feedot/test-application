export default class RangeSlider{
    constructor(){

        this.rightHandle = document.getElementById('rightHandle');
        this.leftHandle = document.getElementById('leftHandle');
        this.line = document.querySelector('.line');
        this.wrapper = document.querySelector('.range_slider_wrapper');
        this.wrapper.ondragstart = ()=> false
        this.rightHandle.onmousedown = e => this.moveRightHandle(e);
        this.leftHandle.onmousedown = e => this.moveLeftHandle(e)
        this.rightSpan = this.rightHandle.querySelector('span');
        this.leftSpan = this.leftHandle.querySelector('span');
        this.leftSpan.onmousedown = null;
        this.rightSpan.onmousedown = null;
        this.line.style.left = "0px",
        this.line.style.right = "auto",
        this.line.style.width = "150px"
        this.data = { from:18, to:68 }
    }
    moveRightHandle(e){
        let { left } = this.line.style;
        this.rightHandle.style.zIndex = 10;
        this.line.style.zIndex = -1;
        this.wrapper.onmousemove = e =>{
           (left !== "auto") && (this.line.style.width = `${e.offsetX - this.createNumber(left)}px`);
            this.changeYearsOld('right',e.offsetX)
            this.wrapper.onmouseout = () => this.finishMoving(e.offsetX)
            this.wrapper.onmouseup = () => this.finishMoving(e.offsetX)
        }

    }
    moveLeftHandle(e){
        e.stopPropagation()
        let  { left,right,width } = this.line.style;
        this.line.style.left = 'auto';

        this.rightHandle.style.zIndex = 10;
        this.line.style.zIndex = -1;

        this.line.style.right = (right === 'auto') && (`${150 - this.createNumber(width) - this.createNumber(left)}px`)

        this.wrapper.onmousemove = e => {
            let right = this.createNumber(this.line.style.right);
            this.line.style.width = `${150 - right - e.offsetX}px`;
            this.changeYearsOld('left',e.offsetX)
            this.wrapper.onmouseout = () => this.finishMoving(true,e.offsetX)
            this.wrapper.onmouseup = () => this.finishMoving(true,e.offsetX)
        }
    }
    finishMoving( bool = false){
        console.log('hi')
        this.wrapper.onmousemove = null;
        this.line.style.zIndex = "auto"
        this.wrapper.onmouseout = null;
        if (bool) {
            let right = this.createNumber(this.line.style.right),
                width = this.createNumber(this.line.style.width);

            this.line.style.left = `${150 - right - width}px`;
            this.line.style.right = 'auto'
        }
    }
    changeYearsOld(handle,offsetX){
        let roundYears = Math.round(offsetX/3)+18;
        if (handle !== 'left') this.data.to = ( roundYears > this.data.from) ? roundYears : this.data.from+1;
        else this.data.from = (roundYears >= this.data.to) ? this.data.to - 1 : roundYears;
        this.paintNumbers();

        this.leftHandle.querySelector('span').innerHTML = this.data.from;
    }
    paintNumbers(){
        this.leftSpan.innerHTML = this.data.from;
        this.rightSpan.innerHTML = this.data.to;
    }
    createNumber (str) { const number = +str.substring(0,str.length -2); return number }
}
