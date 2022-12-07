var lastClickedTool = document.getElementById("add");
var lastClickedColor = document.getElementsByClassName("cc")[0];

var tools = document.getElementsByClassName("tool");
var colors = document.getElementsByClassName("cc");

[...tools].forEach(element => {
    element.addEventListener("click", function(e){
        lastClickedTool.classList.remove("hovered");
        if(element === lastClickedTool && element.id === "delete"){
            lastClickedTool = document.getElementById("add");
            return;
        }
        lastClickedTool = element;
        if(lastClickedTool.id === "delete")
            lastClickedTool.classList.add("hovered");
        if(lastClickedTool.id === "add"){
            document.getElementById("addTicketBox").style.display="flex";
        }
    })
});
[...colors].forEach(element => {
    element.addEventListener("click", function(e){
        lastClickedColor.classList.remove("color-hovered");
        lastClickedColor = element;
        lastClickedColor.classList.add("color-hovered"); 

    })
})
document.getElementById("txt").addEventListener("keyup", function(e){
    if(e.key == "Enter"){
        createTemplate({
            color:lastClickedColor.style.background,
            id:getUniqueId(6),
            content: document.getElementById("txt").value,
            
        })
        document.getElementById("addTicketBox").style.display="none";
        document.getElementById("txt").value = "";
    }
})
window.onload = function(){
    // load all templates from localStorage
    var templateIds = Object.keys(localStorage);
    console.log(templateIds);
    templateIds.forEach(function(element){
        createTemplate(JSON.parse(localStorage.getItem(element)));
    })
}
function createTemplate(json){
    var div = document.createElement("div");
    div.classList.add("template");
    div.classList.add("flexy");
    div.id = json.id;
    div.innerHTML =`
        <div class="flexc">
            <div class="color" style="background:${json.color};"></div>
            <div class="title">#${json.id}</div>
            <div class="content flexy" contenteditable="">${json.content}</div>
        </div>
    `;
    document.getElementById("tcont").appendChild(div);
    div.addEventListener("click", function(e){
        if(lastClickedTool.id === "delete"){
            localStorage.removeItem(div.id);
            div.parentNode.removeChild(div);
        }
    })
    var x = document.getElementsByClassName("content");
    var c = x[x.length-1];
    c.addEventListener("input", function(e){
        json.content = c.innerHTML;
        localStorage.setItem(div.id, JSON.stringify(json));
    })
    localStorage.setItem(div.id, JSON.stringify(json));
}
function getUniqueId(length){
    var dict = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var ans = "";
    for(var i=0;i<length;i++){
        var r = parseInt(Math.random() * dict.length) % dict.length;
        ans += dict[r];
    }
    return ans;
}