Vue.component('ligne', {
    template:
    `<div class="ligne" :style="style" :draggable="true" @dragenter="dragEnter" @dragleave="dragLeave" @drop="drop" @dragstart="dragStart" @dragend="dragEnd">
        <h1 @dragenter.prevent>{{ligne.name}} {{ligne.code}} <span class="rank">{{ligne.rang}}</span></h1>
    </div>`,
    props: {
        ligne: Object
    },
    data: function() {
        return {
            style: {}
        }
    },
    methods: {
        dragEnter: function(e) {
            if (!isBloc) {
                this.style = {"padding-top": "20px"}
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
                if (template.type == "bloc") {
                    return;
                }
                app.addTemplate(template, this.ligne.rang, this.ligne.code_bloc);
            } else if (type == "bloc") {
                return;
            } else if (type == "ligne") {
                var bloc = JSON.parse(e.dataTransfer.getData("ligne"));
                app.addLigne(bloc, this.ligne.rang, this.ligne.code_bloc);
            }
        },
        dragStart: function(e) {
            e.stopPropagation();
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("type", "ligne");
            e.dataTransfer.setData("ligne", JSON.stringify(this.ligne));
        },
        dragEnd: function(e) {
            
        }
    }
})
