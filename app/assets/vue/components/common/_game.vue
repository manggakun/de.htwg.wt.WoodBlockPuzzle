import Vue from "vue";

<template>
    <!--        @for(col <- 1 to size){-->
    <!--        <div class="cellRow">-->
    <!--            @for(row <- 1 to size) {-->
    <!--            <div class="cell hvr-grow" id="@row/@col">-->
    <!--                @if(controller.getCellStatusAtField(row,col)==0){-->
    <!--                <div class="clear"></div>-->
    <!--                }else{-->
    <!--                <div class="set"></div>-->
    <!--                }-->
    <!--            </div>-->
    <!--            }-->
    <!--        </div>-->
    <!--        }-->

    <div class="col-lg-4 col-md-6 col-sm-6 col-12" id="game" align="center">
        <div class="gameImageBackground"></div>

        <div v-for="col in cols" class="cellRow":key="col">
            <div v-for="row in rows" class="cell hvr-grow":key="row" :id="row + '/' + col">
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            size: 8,
            rows: [0, 1, 2, 3, 4, 5, 6, 7],
            cols: [0, 1, 2, 3, 4, 5, 6, 7],
        }),
    };
</script>

<style>

    :root{
        --cell-size: 3.0vw;
        --block-cell-size: 2.5vw;
        --block: 12.5vw;
        --game: 30vw;
        --setColor: #1476B2;
        /*   ad0800   */
    }
    .imageBackground{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -100;
        opacity: 0.3;
    }
    .gameImageBackground{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -50;
        opacity: 100%;
        object-fit: contain;
    }
    .exampleImage{
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -50;
        opacity: 100%;
        border-style: solid;
        object-fit: contain;

    }

    .aboutBackground {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 300%;
        z-index: -100;
        opacity: 0.3;
    }

    #gameBody, #about-body{
        background-color: #111;
    }


    h1, h3{
        font-family: "Comic Sans MS", Comic Sans, cursive;
        color: white;
    }
    #game {
        width: var(--game);
        height: var(--game);
        padding-top: 1%;
        object-fit: scale-down;
    }
    .cellRow{
        display: block;
        font-size: 0;
    }
    .cell{
        height: var(--cell-size);
        width: var(--cell-size);
        display:inline-block;
        border-width: 0.1vw;
        border-style:solid;

    }
    .clear{
        background-color: white;
        height: 100%;
        width: 100%;
        opacity: 60%;
    }
    .set{
        height: 100%;
        width: 100%;
        background-color: var(--setColor);
        opacity: 90%;
    }

    #blocks{
        padding-top: 1%;
    }
    .block{
        width: 14.5vw;
        height: 14.5vw;
        padding: 0.3vw;
        align-content: center;
        box-shadow: 0px 0px 8px 8px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: rgba(200,200,200,0.4);
    }

    .blockCell{
        height: var(--block-cell-size);
        width: var(--block-cell-size);
        display:inline-block;
    }
    .blockClear{
        /*clear cell*/
    }
    .blockSet{
        background-color: var(--setColor);
        height: 100%;
        width: 100%;
        border-width: 0.1vw;
        border-style:solid;
    }
    p{
        #text-align: center;
    }
    .text{
        font-family: "Comic Sans MS", Comic Sans, cursive;
        color: white;
    }

    #about-body {
        text-align: center;
    }

    table {
        position:relative;
        left: 35%;
        margin: 5px
    }
    a {
        color: inherit;
        text-decoration: none;
    }

    a:hover
    {
        color:#00A0C6;
        text-decoration:none;
        cursor:pointer;
    }
    #count, #highscore, #status{
        margin: 10%;
        margin-left: 5%;
    }
</style>