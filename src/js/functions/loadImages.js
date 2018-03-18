// finction for loading images
export default (arr) => {
    let images = {};
    arr.keys().map( item => images[item.replace("./", "")] = arr(item));
    return images;
}

//using it after import
// const images = THIS_EXPORT_FUNCTION( require.context(STRING_PATH_TO_IMG_DIR, false, /\.(png|jpe?g|svg)$/));