Vue.component('form-preview', {
    template:
    `<div class="form-preview" @dragover.prevent @drop="drop">
        <bloc v-for="bloc in blocs" :key="bloc.code" :bloc="bloc" :lignes="lignes.filter(l => l.code_bloc == bloc.code)"></bloc>
    </div>`,
    props: {
        blocs: Array,
        lignes: Array
    },
    methods: {
        drop: function(e) {
            e.stopPropagation();
            let type = e.dataTransfer.getData("type");
            if (type == "template") {   
                var template = JSON.parse(e.dataTransfer.getData("template"));
                if (template.type != "bloc") {
                    return;
                }
                app.addTemplate(template);
            } else if (type == "bloc") {
                var bloc = JSON.parse(e.dataTransfer.getData("bloc"));
                app.addBloc(bloc);
            }
        }
    }
})
