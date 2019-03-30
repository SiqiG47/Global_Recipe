document.getElementById("searchSubmit").addEventListener("click", function(event){
    event.preventDefault();
    const value = document.getElementById("searchInput").value;
    if (value ==="")
        return;
    const url = "https://api.edamam.com/search?q=" + value + "&app_id=43fae947&app_key=be40155e75e13110cad6e378cd01cc68&from=0&to=50";
    fetch(url)
        .then(function(response){
            return response.json();
        }).then(function(json){
            let result = "";
            for(let i = 0; i<json.hits.length; i++){
                result += '<br><h2>' + json.hits[i].recipe.label + '</h2>';
                result += '<div class="row">';
                result += '<div class="column"><img src=' + json.hits[i].recipe.image + '></div>';
                result += '<div class="column"><ul><h3>INGREDIENTS</h3>';
                for(let j = 0; j < json.hits[i].recipe.ingredients.length; j++){
                    result += '<li>' + json.hits[i].recipe.ingredients[j].text + '      Weight:' + json.hits[i].recipe.ingredients[j].weight + '</li>'
                }
                result += '</ul></div>';
                result +='</div><br><br>';
            }
            document.getElementById("recipeResult").innerHTML = result;
        })

})