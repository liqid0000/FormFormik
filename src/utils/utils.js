export const convertDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth()+1; 
    const yyyy = date.getFullYear();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return date = mm+'/'+dd+'/'+yyyy;
}

export const iterateObject = (obj) => {
    var value = '', header = '';
            for (let name in obj) {
                if (obj.hasOwnProperty(name)) {
                if (isObject(obj[name])) {
                    var out = iterateObject(obj[name]);
                    value += out.value;
                    header += out.header;
                } else {
                    value += removeNewLine(obj[name]) + '; ';
                    header += name + '; ';
                }
                }
            }
    return {
        "value":value,
        "header":header
    };
}
const isObject = (obj) => {
    return (typeof obj === 'object');
}
const removeNewLine = (item) => {
    return item.toString().replace(/(\r\n|\n|\r)/gm,"");
}  

