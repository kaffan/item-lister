
//importing localstorage class
//import Localstorage from './Localstorage.js';
class LocalStorage{
  constructor()
  {
    //we are using "JSON.parse(localStorage.getItem("tasks")) || [] \\ []" because initially local storage dosent contains any object with
    // id "tasks" so we will create an empty array
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }
  save(e)
  {
    for(var i=0;i<e.length;i++){
      this.tasks.push(e[i]);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
  load()
  {
    var sto = this.tasks;
    console.log(sto);
    for(var i=0;i<this.tasks.length;i++)
    {
      var a = document.querySelector(".ListItems");
      var node1 = document.createElement("div");
      node1.className = "ListI";
      var textN = document.createTextNode(this.tasks[i]);
    //  textN.classList.addClass("col");
      var node2 = document.createElement("button");
      node2.className = "IT btn btn-danger float-right";
      node2.textContent = "X";
      //node2.className = "btn btn-danger"
      node2.addEventListener("click",function()
      {
        if(confirm("Are you sure you want to delete this item from the list?"))
        this.parentNode.parentNode.removeChild(this.parentNode);
        localStorage.removeItem('tasks');
        sto.splice(sto.indexOf(this.parentNode.firstChild.textContent),1);
        localStorage.setItem('tasks', JSON.stringify(sto));
      });
      node1.appendChild(textN);
      node1.appendChild(node2);
      a.appendChild(node1);
    }
  }
}
const storage = new LocalStorage();
//var tasks = storage.tasks;
var arr=[];


//adding new items
function addItem()
{
  if(document.getElementsByName("addBox")[0].value !== ""){
  var a = document.querySelector(".ListItems");
  var node1 = document.createElement("div");
  node1.className = "ListI";
  var txt = document.getElementsByName("addBox");
  arr.push(txt[0].value);
  var textN = document.createTextNode(txt[0].value);
//  textN.classList.addClass("col");
  var node2 = document.createElement("button");
  node2.className = "IT btn btn-danger float-right";
  node2.textContent = "X";
  //node2.className = "btn btn-danger"
  node2.addEventListener("click",function()
  {
    if(confirm("Are you sure you want to delete this item from the list?"))
    this.parentNode.parentNode.removeChild(this.parentNode);
    localStorage.removeItem('tasks');
    sto.splice(sto.indexOf(this.parentNode.firstChild.textContent),1);
    localStorage.setItem('tasks', JSON.stringify(sto));
  });
  node1.appendChild(textN);
  node1.appendChild(node2);
  a.appendChild(node1);
  document.getElementsByName("addBox")[0].value="";
}
}
//filter items

var itemz = document.getElementsByName("srchBar");
itemz[0].addEventListener("keyup",filterItems);

function filterItems(e)
{
  var text = e.target.value.toLowerCase();
  var arr = document.querySelectorAll(".ListI");
  for(var i=0;i<arr.length;i++)
  {
    var itemTxt = arr[i].firstChild.textContent;
    //console.log(itemTxt);
    if(itemTxt.indexOf(text) == -1)
    {
      arr[i].style.display = 'none';
    }
    else
    {
      arr[i].removeAttribute("style");
      //arr[i].lastChild.style.marginLeft="auto";
    }
  }
}
//saving Items
function saveAll()
{
  storage.save(arr);
  arr = [];
}
document.querySelector("body").addEventListener("load",storage.load());
