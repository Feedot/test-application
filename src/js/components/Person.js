export default class Person {

    constructor(obj){
        this.obj = obj
        this.article = document.querySelector('article')
    }

    build(){
        const {id,name,years,city,country,images,top,online,add} = this.obj

        let temaplate = document.createElement('figure')
            temaplate.innerHTML = `
                <div class="image_wrapper">
                    <img src="${images[0]}">
                    <div>
                        <span><img src=${'camera.png'}> ${images.length}</span>
                        <span class=${ top ? null : 'active'} >ТОП</span>
                    </div>
                </div>
                <figcaption>
                    <div>
                        <button class="add">
                            <img src=${ add ? 'star_true.png':'star_false.png'}>
                            Избранное
                        </button>
                        <button>
                            <img src=${"letter.png"}>
                            Написать
                        </button>
                    </div>
                    <p class="name">${name + ", " + years}<span class=${ online ? 'active': null}></span></p>
                    <p>${city + ", " + country}</p>
                </figcaption>`

        top ? this.article.insertBefore(temaplate,this.article.firstChild) : this.article.appendChild(temaplate);
        document.querySelector('.add').onclick = () => id;

    }

}