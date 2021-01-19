let isBloc = false;

app = new Vue({
    el: "#form-builder",
    data: {
        templates: [
            {
                type: "bloc",
                name: "Bloc"
            },
            {
                type: "text",
                name: "Champs texte"
            },
            {
                type: "date",
                name: "Champs date"
            }
        ],
        blocs: [],
        lignes: []
    },
    methods: {
        forceRerender() {
            this.$forceUpdate();
        },
        addTemplate(template, rang, code_bloc) {
            if (template.type == "bloc") {
                let code = prompt("Entrez un code pour le bloc");
                if (code == null || code.length == 0) {
                    return;
                }
                if (rang != null) {
                    template.rang = rang;
                    for (const bloc of this.blocs) {
                        if (bloc.rang >= rang) {
                            bloc.rang++;
                        }
                    }
                } else {
                    template.rang = this.blocs.length + 1;
                }
                
                template.code = code;                
                this.blocs.push(template);
                this.blocs = this.blocs.sort((b1, b2) => (b1.rang > b2.rang) ? 1 : -1);
            } else if (template.type != "bloc") {
                let code = prompt("Entrez un code pour le bloc");
                if (code == null || code.length == 0) {
                    return;
                }
                if (rang != null) {
                    template.rang = rang;
                    for (const ligne of this.lignes.filter(l => l.code_bloc == code_bloc)) {
                        if (ligne.rang >= rang) {
                            ligne.rang++;
                        }
                    }
                } else {
                    template.rang = this.lignes.filter(l => l.code_bloc == code_bloc).length + 1;
                }
                
                template.code_bloc = code_bloc;
                template.code = code;                
                this.lignes.push(template);
                this.lignes = this.lignes.sort((l1, l2) => (l1.rang > l2.rang) ? 1 : -1);
            }
        },
        addBloc(movedBloc, rang) {
            let index = this.blocs.findIndex(b => b.code == movedBloc.code);
            this.blocs.splice(index, 1);

            for (let index = 0; index < this.blocs.length; index++) {
                const bloc = this.blocs[index];                
                if (rang != null && (index + 1) >= rang) {
                    bloc.rang = index + 2;
                } else {
                    bloc.rang = index + 1;
                }
            }

            movedBloc.rang = rang != null ? rang : this.blocs.length + 1;

            this.blocs.push(movedBloc);
            this.blocs = this.blocs.sort((b1, b2) => (b1.rang > b2.rang) ? 1 : -1);
        },
        addLigne(movedLigne, rang, code_bloc) {
            let index = this.lignes.findIndex(l => l.code == movedLigne.code);
            this.lignes.splice(index, 1);

            let j = 0;
            let k = 0;
            for (let index = 0; index < this.lignes.length; index++) {
                const ligne = this.lignes[index];    
                if (ligne.code_bloc == code_bloc) {                        
                    if (rang != null && (j + 1) >= rang) {
                        ligne.rang = j + 2;
                    } else {
                        ligne.rang = j + 1;
                    }
                    j++;
                } else if (ligne.code_bloc == movedLigne.code_bloc) {
                    ligne.rang = k + 1;
                    k++;
                }
            }

            movedLigne.rang = rang != null ? rang : this.lignes.filter(l => l.code_bloc == code_bloc).length + 1;
            movedLigne.code_bloc = code_bloc;
            this.lignes.push(movedLigne);
            this.lignes = this.lignes.sort((l1, l2) => (l1.rang > l2.rang) ? 1 : -1);
        }
    }
});
