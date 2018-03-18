export default class NavBar{
    constructor(data,parent,arr){

        this.items = arr;
        this.aside = parent;
        this.activeItem = +arr[0] ? arr[0] : arr[1] ;
        this.data = data;
        this.activeArray = data;
        this.rowBtns = document.getElementsByClassName('rows');
        this.rows=['left','right']

    }
    build(func){

        console.log(this.items)

        let template = document.createElement('div');
            template.innerHTML = this.items.reduce((res,item)=>{
                res += `<button class=${ item === this.activeItem ? 'active' : null }>${item}</button>`
                return res
            },"");

            if (!+this.items[0] ) this.aside.appendChild(template);
            else this.aside.insertBefore(template,this.aside.lastElementChild);

        let btns = this.aside.querySelector('div').getElementsByTagName('button');

        // Actions
        Array.from(btns).map( btn => btn.onclick = () => this.onClick( btn,func,template ))

        Array.from(this.rowBtns).map( (row,i) => row.onclick = () => this.takeNumber(this.activeItem,func,template,this.rows[i]))

    }
    onClick(btn,func,template){

        this.activeItem = btn.innerHTML;
        this.createActiveArr(this.activeItem);
        this.reRender(template,func)

    }
    takeNumber(item,func,template,row){
        if ((row === 'left')&& +item-1) {
            this.activeItem = (--this.activeItem).toString()
            this.reRender(template,func)
        }else if(row === 'right' && +item < this.items.length){
            this.activeItem = (++this.activeItem).toString()
            this.reRender(template,func)
        }

    }

    createActiveArr(item){

        (item === this.items[0]) ? this.sortArr('online') :
        (item === this.items[2]) ? this.sortArr('top'):
        this.activeArray = this.data.slice()

    }
    reRender(template,func){
        template.remove()
        this.build(func)
        func()
    }

    sortArr(kind){
        this.activeArray = this.data.reduce((arr,item) =>{
            item[kind] && arr.push(item)
            return arr
        },[])
    }

}