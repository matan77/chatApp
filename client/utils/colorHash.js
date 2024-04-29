export default colorHash = (inputString) => {
    const sum = inputString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);


    r = ~~(('0.' + Math.sin(sum + 1).toString().substr(6)) * 256);
    g = ~~(('0.' + Math.sin(sum + 2).toString().substr(6)) * 256);
    b = ~~(('0.' + Math.sin(sum + 3).toString().substr(6)) * 256);

    let hex = "#";

    hex += ("00" + r.toString(16)).substr(-2, 2).toUpperCase();
    hex += ("00" + g.toString(18)).substr(-2, 2).toUpperCase();
    hex += ("00" + b.toString(20)).substr(-2, 2).toUpperCase();

    return hex;
};
