Vue.component('bloc', {
    template:
    `<div class="bloc" :style="style" :draggable="true" @dragenter="dragEnter" @dragleave="dragLeave" @drop="drop" @dragstart="dragStart" @dragend="dragEnd">
        <h1 @dragenter.prevent>{{bloc.name}} {{bloc.code}} <span class="rank">{{bloc.rang}}</span></h1>
        <div @dragenter.prevent class="ligne-list">
            <ligne v-for="ligne in lignes" :key="ligne.code" :ligne="ligne"></ligne>
        </div>
    </div>`,
    props: {
        bloc: Object,
        lignes: Array
    },
    data: function() {
        return {
            style: {}
        }
    },
    methods: {
        dragEnter: function(e) {
            if (isBloc) {
                this.style = {"padding-top": "40px"}
            }
        },
        dragLeave: function(e) {
            this.style = {}
        },
        drop: function(e) {
            e.stopPropagation();
            this.style = {}
            let type = e.dataTransfer.getData("type");            
            if (type == "template") {   
                var template = JSON.parse(e.dataTransfer.getData("template"));
                app.addTemplate(template, template.type == "bloc" ? this.bloc.rang : null, this.bloc.code);
            } else if (type == "bloc") {
                var bloc = JSON.parse(e.dataTransfer.getData("bloc"));
                app.addBloc(bloc, this.bloc.rang);
            } else if (type == "ligne") {
                var ligne = JSON.parse(e.dataTransfer.getData("ligne"));
                app.addLigne(ligne, null, this.bloc.code);
            }
        },
        dragStart: function(e) {
            e.stopPropagation();
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("type", "bloc");
            e.dataTransfer.setData("bloc", JSON.stringify(this.bloc));
            isBloc = true;
        },
        dragEnd: function(e) {
            isBloc = false;
        }
    }
})
