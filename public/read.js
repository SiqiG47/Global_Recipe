// var app = new Vue({
//     el: '#app',
//     data: {
//       items: [],
//     },
//     computed: {
//       async currentItems() {
//         try {
//           let response = await axios.get("/api/recipes");
//           this.items = response.data;
//           return response.data;
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     },
//   });