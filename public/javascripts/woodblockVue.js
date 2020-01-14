let rows= [0, 1, 2, 3, 4, 5, 6, 7];
let cols= [0, 1, 2, 3, 4, 5, 6, 7];

$(document).ready(function () {
    console.log("Vue is loading");
    var woodblock = new Vue({
        el:'#woodblock-app'
    })
    console.log("Vue was loaded");
});

Vue.component('woodblock-app', {
    template:`
        <div class="col-lg-4 col-md-6 col-sm-6 col-12" id="game" align="center">
        <div class="gameImageBackground"></div>
    
            <div v-for="col in cols" class="cellRow":key="col">
                <div v-for="row in rows" class="cell hvr-grow":key="row" :id="row + '/' + col">
                <div class="clear"></div>
            </div>
        </div>
    </div>`,
    data:function () {
        return {
            rows: rows,
            cols: cols
        }
    },
});