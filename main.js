const deleteTodo = (id) =>{
  $.ajax({
    url: '/todoDelete',
    type: 'delete',
    data: JSON.stringify({itemid: id}),
    success: (result)=>{printTodos(JSON.parse(result));}
  });
};
const checkChange = function(evn){
  $.ajax({
    url: '/todoCheckedChange',
    type: 'put',
    data: JSON.stringify({itemid: $(evn).parent().attr("id")}),
    success: (result)=>{printTodos(JSON.parse(result));}
  });
};
const checked = (bool) =>{
  if(bool)
    return "checked";
  return "";
}
const printTodos = (array) =>{
  $("#todoList").empty();
  for (let i=0; i<=array.length-1; i++){
    const element = '<li id="'+array[i].id+'">'+array[i].todo+'<input '+checked(array[i].checked)+' type="checkbox" onclick="checkChange(this)"/><button onclick="deleteTodo('+array[i].id+')">Delete</button></li>'
    $("#todoList").append(element);
  }
};
window.onload = function(){
  $("#todoAddButton").on("click", ()=>{
    if ($("#todoAdd").val()!=""){
      $.ajax({
        url: '/todoAdd',
        type: 'post',
        data: JSON.stringify({todo: $("#todoAdd").val(), id: null, checked: false}),
        success: (result)=>{printTodos(JSON.parse(result));}
      });
      $("#todoAdd").val("");
    }});
    $("#todoSearchButton").on("click", ()=>{
        $.ajax({
          url: '/todoSearch',
          type: 'post',
          data: JSON.stringify({searchText: $("#todoSearch").val()}),
          success: (result)=>{printTodos(JSON.parse(result));}
        });
      });
  $.ajax({
    url: '/initialTodos',
    type: 'get',
    success: (result)=>{printTodos(JSON.parse(result));}
  });
};
