
class WineView{
    static help(){
        console.log('Wine Management Command : ');
        console.log('</br>');
        console.log(`node index.js`);
        console.log(`node index.js help`);
        console.log(`node index.js wines`);
        console.log(`node index.js add <wine_name>`);
        console.log(`node index.js sell <wine_id>`);
        console.log(`node index.js rename <wine_id>`);
        console.log(`node index.js find by <id>`);
    }
    static wines(wines){
        console.log(`Welcome to Wine Management`)

        // console.log(wines);
        wines.forEach(wine => {
            const {id, name} = wine;
            console.log(`${id}. ${name}`);
        });
    }

    static message(message){
        console.log(message);
    }

    static error(err){
        console.log(err);
    }
}


module.exports = WineView;