const scrollTop = () => {
    let scrolled = window.pageYOffset,
    timer;
    let scrollToTop = () => {
        if(scrolled > 0){
            window.scrollTo(0,scrolled)
            scrolled = scrolled - 50;
            timer = setTimeout(scrollToTop,5)
        }else {
            clearTimeout(timer)
            window.scrollTo(0,0)
        }
    }
    scrollToTop()
}
export default scrollTop;
