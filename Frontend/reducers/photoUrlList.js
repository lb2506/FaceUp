export default function(url =[], action) {

    if(action.type == 'photoUrlList') {

      var newUrl = [...url, action.url];

        return newUrl;

    } else {

    return url;
}};
