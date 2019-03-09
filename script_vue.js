let app = new Vue({
    el: '#app',
    data: {
        number: '',
        post:{},  
        addedIngredent:'',   
        addedTitle: '',
        addedIMG: '',
        addedPrepare: '',
        like:'',
        dislike:'',
    },
    created() {
        this.num = 0;
        this.like = 0;
        this.dislike = 0;
    },
    methods: {
        addRecipe() {
            this.number = 1;
            if (!(this.number in this.post))
                Vue.set(app.post, this.number, new Array);
            this.post[this.number].push({
                title: this.addedTitle,
                img: this.addedIMG,
                ingredient: this.addedIngredent,
                prepare: this.addedPrepare,
                like:this.like,
                dislike:this.dislike,
            });
            this.like = 0;
            this.dislike = 0;
            console.log(this.post)
            this.addedTitle='';
            this.addedIMG = '';
            this.addedPrepare = '';
            this.addedIngredent='';
        },
    },
});