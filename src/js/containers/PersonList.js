import Person from '../components/Person'
import Filter from '../containers/Filter'
import NavBar from '../components/NavBar'

export default class PersonList{
    constructor(data){
        this.data = data;
        this.Filter = new Filter();
        this.NavList = new NavBar(data,document.querySelector('aside'),["Онлайн","Новые","Популярные"]);
        this.NavPages = new NavBar(data,document.querySelector(".number_line"),["1","2","3","4","5","6"]);
        this.reRender = document.getElementById('search');
        this.reRender.onclick = () => this.build();
        this.article = document.querySelector('article')
    }

    initFilters(){

        this.Filter.build()
        this.NavList.build(this.build.bind(this))
        this.NavPages.build(this.build.bind(this))
        this.build()
    }

    build(){

        this.article.innerHTML = "";

        let nav = this.filter(this.NavList.activeArray),
            length = nav.length % 8 ? Math.ceil(nav.length/8): nav.length/8,
            activeItem = +this.NavPages.activeItem;

            (length <= 6 ) && this.createNavPagesItems(length);
            (!nav.length) ? this.emptyList() : this.createList(nav, activeItem);
    }

    createNavPagesItems(length){

        this.NavPages.items = new Array(length).fill(true).reduce((res, item, index) => {
            if (index + 1 <= length) res.push((index + 1).toString())
            return res
        }, [])

        this.removeDiv()
        this.NavPages.build(this.build.bind(this))

    }

    emptyList(){

        let template = document.createElement('p');
        template.className = "empty"
        template.innerHTML = "По данному фильтру ничего не найдено"
        this.article.appendChild(template)
        this.removeDiv()

    }

    createList(nav,activeItem){
        nav.map( (item,index)=>{
            if(( index >= (activeItem-1)*8 )
                && ( index+1 <= activeItem*8) ) { new Person(item).build() }
        })
    }

    filter(arr){
        let {sex,city,years} = this.Filter.getData(),
            filterNav = arr.reduce( (res,item,index) =>{

            if ((sex === "Девушку" && item.women)
                && (city === item.city || city === "Все(города)")
                && ((years.from <= item.years)&&(item.years <= years.to))){
                res.push(item)
            }

                return res;

        },[])
        return filterNav
    }
    removeDiv(){
        let div =  document.querySelector(".number_line").querySelector('div')
        div && div.remove()
    }
}