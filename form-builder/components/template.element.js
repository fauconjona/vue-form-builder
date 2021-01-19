Vue.component('template-element', {
    template:
    `<div class="template-element" :draggable="true" @dragstart="dragStart" @dragover.stop  @dragend="dragEnd">
        {{template.name}}
    </div>`,
    props: {
        template: Object,
    },
    methods: {
        dragStart: function(e) {
            e.stopPropagation();
            e.dataTransfer.effectAllowed = "copy";
            e.dataTransfer.setData("type", "template");
            e.dataTransfer.setData("template", JSON.stringify(this.template));
            if (this.template.type == "bloc") {
                isBloc = true;
            }
        },
        dragEnd: function(e) {
            isBloc = false;
        }
    }
})
