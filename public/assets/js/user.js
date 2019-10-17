$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {

        var html = template('usersTpl', { data: res });
        
        $('#usersBox').html(html);
    }
})
$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    //Jqurey提供的自动收集表单数据并且使这些数据序列化，当作ajax的请求参数

    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (res) {
            location.reload();
            //如果不这样写，可以添加一个字符串，添加到tbody的最后一行
        }
    })
    return false;
})
$('#modifyBox').on('change','#avatar', function () {
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        processData: false,
        contentType: false,
        data: fd,
        success: function (res) {
            
            $('#preview').prop('src',res[0].avatar);
            $('.avatar').val(res[0].avatar);
        }
    })
})
//编辑传值
$('#usersBox').on('click','.edit',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function(res){
           var html=template('modifyTpl',res)
            console.log(html);
            $('#modifyBox').html(html)
        }
    })
})
//修改用户信息
$('#modifyBox').on('submit','#modifyForm',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/users/'+id,
        data:$(this).serialize(),
        success:function(){
            location.reload();
        }
    })
    return false;
})
$('#usersBox').on('click','.del',function(){
    if(confirm('是否要删除？')){
        var id=$(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(){
                location.reload();
            }
        })
        return false;
    }
})
//全选
$('#checkAll').on('change',function(){
    var bool=$(this).prop('checked');
    $('#usersBox').find('input[type="checkbox"]').prop('checked',bool);
    if(bool==true){
        $('#delAll').show();
    }else{
        $('#delAll').hide();
    }
})
$('#usersBox').on('change','input[type="checkbox"]',function(){
    if($('#usersBox').find('input[type="checkbox"]:checked').length==$('#usersBox').find('input[type="checkbox"]').length){
        $('#checkAll').prop('checked',true);
    }else {
        $('#checkAll').prop('checked',false);
    }

    if($('#usersBox').find('input[type="checkbox"]:checked').length>0){
        $('#delAll').show();
    }else{
        $('#delAll').hide();

    }
})
$('#delAll').on('click',function(){
    if(confirm('确定要删除吗？')){
        var checkList=$('#usersBox').find('input[type="checkbox"]:checked');
    var str='';
    $.each(checkList,function(index,items){
        str+=$(items).attr('data-id')+'-';
    })
    str=str.substr(0,str.length-1);
    $.ajax({
        type:'delete',
        url:'/users/'+str,
        success:function(){
            location.reload();
        }
    })
    }
})