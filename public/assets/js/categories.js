$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        var html=template('categoriesTpl',{data:res});
        $('#categoryBox').html(html);
    }
})
$('#addCategory').on('submit',function(){
    $.ajax({
        type:'post',
        url:'/categories',
        data:$(this).serialize(),
        success:function(){
            location.reload();
        }
    })
    return false;
})
//编辑传值
$('#categoryBox').on('click','.edit',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(res){
         var html =template('modifycategoryTpl',res);
         $('#modifyCategoryBox').html(html);
        }
    })
})
//修改分类
$('#modifyCategoryBox').on('submit','#modifyCategory',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:$(this).serialize(),
        success:function(){
            location.reload();
        }
    })
    return false;
})