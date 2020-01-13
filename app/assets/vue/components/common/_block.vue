import Vue from "vue";

<template>
<div class="row">
    <div class="col"></div>
    <div class="col-md-6 col-sm-8 col-12" id="blocks" align="center">
        <div class="row" id="blockrow">
            <div class="col-sm-4">
                <div class="block hvr-grow" id="1">
                    @for(col <- 0 until controller.b1.blockmaxy){
                    <div class="cellRow">
                        @for(row <- 0 until controller.b1.blockmaxx) {
                        <div class="blockCell">

                        </div>
                        }
                    </div>
                    }

                    <div v-for="col in cols" class="cellRow">
                        <div v-for="row in rows" class="blockCell">
                            @if(controller.getCellStatusAtBlock(1,row,col)==0){<div class="blockClear"></div>
                            }else{ <div class="blockSet"></div> }
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="block hvr-grow" id="2" >
                    @for(col <- 0 until controller.b2.blockmaxy){
                    <div class="cellRow">
                        @for(row <- 0 until controller.b2.blockmaxx) {
                        <div class="blockCell">
                            @if(controller.getCellStatusAtBlock(2,row,col)==0){<div class="blockClear"></div>
                            }else{ <div class="blockSet"></div> }
                        </div>
                        }
                    </div>
                    }
                </div>
            </div>
            <div class="col-sm-4">
                <div class="block hvr-grow" id="3">
                    @for(col <- 0 until controller.b3.blockmaxy){
                    <div class="cellRow">
                        @for(row <- 0 until controller.b3.blockmaxx) {
                        <div class="blockCell">
                            @if(controller.getCellStatusAtBlock(3,row,col)==0){<div class="blockClear"></div>
                            }else{ <div class="blockSet"></div> }
                        </div>
                        }
                    </div>
                    }</div>
            </div>
        </div>
    </div>
    <div class="col"></div>
</div>
</template>