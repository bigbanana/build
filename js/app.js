require(['jquery','utils'],function($,utils){

  /**
   * ajax设置
   */
   +(function(){
    $.ajaxSetup({
      dataType: 'text',
      dataFilter: function(str){
        if(str == 2){
          utils.error('您还没有登录！');
        }
        return str;
      }
    });
   })();

  /**
   * 设置dialog默认尺寸
   */
    require(['jquery.dialog'],function(Dialog){
      $.extend(Dialog.options,{
        width: 600,
        height: 520
      });
    });

  /**
   * 设置默认时间格式
   */
  require(['jquery.datepicker'],function(Datepicker){
    Datepicker.options.dateFormat = "yy-mm-dd";
    Datepicker.options.changeYear = true;
  });

  /**
   * body ready
   */
  $(function(){

    var $body = $(document.body);

    /**
     * 表单clearInput清除功能
     */
    
    require(['jquery.clearInput'],function(){
      $('.main>.search-tab input[type=text]:not([data-widget=datepicker])').clearInput();
    });

    function updateNum($target,number){
      var $target = $($target);
      var num = parseInt($target.text())||0;
      num+=number;
      $target.text(num||0);
    }

    /**
     * 收藏
     */
    $body.on('click','.action-collect',function(){
      var $this;
      $this = $(this);
      $.post("/Course/collect",$this.data()).done(function(res){
        if(res==1){
          utils.success("收藏成功！");
          $this.removeClass('btn-primary').find('span:eq(0)').text('已收藏');
          updateNum($this.find('b'),1);
        }
        if(res==0){
          utils.success("取消成功！");
          $this.addClass('btn-primary').find('span:eq(0)').text('收藏');
          updateNum($this.find('b'),-1);
        }
      });
    });

    /**
     * 关注
     */
    $body.on('click','.action-follow',function(){
      var $this;
      $this = $(this);
      $.post("/Teacher/focused",$(this).data()).done(function(res){
        if(res==1){
          utils.success("关注成功！");
          $this.removeClass('btn-primary').find('span:eq(0)').text('已关注');
        }
        if(res==0){
          utils.success("取消成功！");
          $this.addClass('btn-primary').find('span:eq(0)').text('关注');
        }
      });
    });

    
    /**
     * 关注话题
     */
    $body.on('click','.action-follow-discus',function(){
      var $this;
      $this = $(this);
      $.post("/Discuss/focused",$(this).data()).done(function(res){
        if(res==1){
          utils.success("关注成功！");
          $this.removeClass('btn-primary').find('span:eq(0)').text('已关注');
          updateNum($this.find('.num'),1);
        }
        if(res==0){
          utils.success("取消成功！");
          $this.addClass('btn-primary').find('span:eq(0)').text('关注');
          updateNum($this.find('.num'),-1);
        }
      });
    });

    /**
     * 侧边栏
     */
    require(['sidebar','jquery.widget'],function(Sidebar){
      var sidebar = new Sidebar();
      sidebar.$el.widget();
    });

  }); 

});


/**
 * 手机兼容
 */
require(['device'],function(device){
  if(device.mobile()){
    require(['news.mobile'],function(){});
  }
});