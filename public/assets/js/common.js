$('#logout').on('click',function(){
    var isLogout=confirm('确认退出？');
   if(isLogout){
    $.ajax({
        type:'post',
        url:'/logout',
        success:function(){
            location.href='login.html'
        },
        error:function(){
            alert('退出失败！');
        }
    })
   }
})