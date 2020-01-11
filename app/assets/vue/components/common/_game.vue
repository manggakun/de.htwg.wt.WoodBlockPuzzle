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