var app = new Vue({
    el: '#admin',
    data: {
        file: null,
        addItem: null,
        items: [],
        findTitle: "",
        findItem: null,
        ItemID: null,

        ingredient:'',   
        title: '',
        prepare: '',
        like:'',
        dislike:'',
    },
    methods: {
        fileChanged(event) {
          this.file = event.target.files[0]
        },
        async getItems() {
          try {
            let response = await axios.get("/api/recipes");
            this.items = response.data;
            return true;
          } catch (error) {
            console.log(error);
          }
        },
        async upload() {
          try {
            const formData = new FormData();
            formData.append('photo', this.file, this.file.name)
            let r1 = await axios.post('/api/photos', formData);
            let r2 = await axios.post('/api/recipes', {
              title: this.title,
              path: r1.data.path,
              ingredient: this.ingredient,
              prepare: this.prepare,
            });
            this.addItem = r2.data;
            console.log(this.addItem);
            this.getItems();
            this.ingredient='';   
            this.title='';
            this.prepare= '';
            this.path="";
            this.file="";
            this.file.name="";

          } catch (error) {
            console.log(error);
          }
        },
        selectItem(item) {
          this.findTitle = "";
          this.findItem = item;
        },
        async deleteItem(item) {
          try {
            let response = axios.delete("/api/recipes/" + item._id);
            this.ItenID = null;
            this.findItem = null;
            this.getItems();
            return true;
          } catch (error) {
            console.log(error);
          }
        },
        async editItem(item) {
          try {
            let response = await axios.put("/api/recipes/" + item._id, {
              title: this.findItem.title,
              ingredient:this.findItem.ingredient,
              prepare:this.findItem.prepare
            });
            this.findItem = null;
            this.getItems();
            return true;
          } catch (error) {
            console.log(error);
          }
        },
      },
      created() {
        this.getItems();
      },
      computed :{
          currentItems(){
              return this.items;
          }
      },
});