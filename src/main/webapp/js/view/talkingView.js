/**
 * Created by wangwenxiang on 16-1-11.
 */

define(['jquery','view/windowView','data/userData','data/organizationData'],function($,windowView,userData,orgData){

    /**
     * 初始化talking面板
     * 初始化时,所有数据从后台获取,都是未读取的聊天记录
     * @param personalTalking
     * @param orgTalking
     */
    var initTalkingPanel = function(personalTalking,orgTalking,sysTalking,friendTalking){
        $(".my-talking").children("li").remove();
        var html = "";
        $.each(personalTalking,function(i,item){
            html = html+"<li class='talking-li' _type='user' _id='"+item.user_id+"' id='user_"+item.user_id+"'>";
            if(item.user_photo == null || item.user_photo == ""){
                html = html+"<img src='../img/photo.jpg'>";
            }else{
                html = html+"<img src='"+item.user_photo+"'>";
            }
            html = html+"<div class='name-desc'><div class='talking-name'>"+item.name+"</div>";
            if(item.user_description == null || item.user_description == ""){
                html = html+"<div class='talking-desc'>该用户没有说明</div>";
            }else{
                html = html+"<div class='talking-desc'>"+item.user_description+"</div>";
            }
            html = html+"</div><span class='unread-count'>"+item.count+"</span></li>"
        });
        $.each(orgTalking,function(i,item){
            html = html+"<li class='talking-li' _type='org' _id='"+item.organization_id+"' id='org_"+item.organization_id+"'>";
            html = html+"<i class='fa "+item.organization_logo+"'></i><div class='name-desc'>";
            html = html+"<div class='talking-content'>"+item.name+"</div></div>";
            html = html+"<span class='unread-count'>"+item.count+"</span></li>";
        });
        if(sysTalking.unReadNum > 0){
            html = html+"<li class='talking-li' _type='sys' _id='0' id='sys_0'>";
            html = html+"<div class='name-desc'>";
            html = html+"<div class='talking-content'>系统消息</div></div>";
            html = html+"<span class='unread-count'>"+sysTalking.unReadNum+"</span></li>";
            windowView.addSysUnreadTalking(sysTalking.message);
        }
        $.each(friendTalking,function(i,item){
            html = html+"<li class='talking-li' _type='sys' _id='"+item.message_id+"' id='sys_"+item.message_id+"'>";
            html = html+"<div class='name-desc'>";
            html = html+"<div class='talking-content'>"+item.message_content+"</div></div>";
            html = html+"<span class='unread-count'>1</span></li>";
        });
        if(html == ""){
            html = "<div class='talking-noTalking'>没有未读消息</div>";
        }
        $(".my-talking").append(html);
    };

    var addTalkingPanel = function(type,talking){
        var html = "";
        if(type == "user"){
            html = html+"<li class='talking-li' _type='user' _id='"+talking.user_id+"' id='user_"+talking.user_id+"'>";
            if(talking.user_photo == null || talking.user_photo == ""){
                html = html+"<img src='../img/photo.jpg'>";
            }else{
                html = html+"<img src='"+talking.user_photo+"'>";
            }
            html = html+"<div class='name-desc'><div class='talking-name'>"+talking.user_name+"</div>";
            if(talking.user_description == null || talking.user_description == ""){
                html = html+"<div class='talking-desc'>该用户没有说明</div>";
            }else{
                html = html+"<div class='talking-desc'>"+talking.user_description+"</div>";
            }
        }else if (type == "org"){
            html = html+"<li class='talking-li' _type='org' _id='"+talking.organization_user_organization+"' id='org_"+talking.organization_user_organization+"'>";
            html = html+"<i class='fa "+talking.organization_logo+"'></i><div class='name-desc'>";
            html = html+"<div class='talking-content'>"+talking.organization_name+"</div>";
        }
        if(talking.count == 0){
            html = html+"</div><span class='unread-count'></span></li>";
        }else {
            html = html+"</div><span class='unread-count'>"+talking.count+"</span></li>";
        }
        $(".talking-noTalking").remove();
        $(".my-talking").prepend(html);
    };

    /**
     * 将talking面板的未读消息取消掉
     * @param type
     * @param id
     */
    var removeUnreadCount = function (type,id) {
        removeMessageCount($("#"+type+"_"+id).find(".unread-count"));
    };

    var upTalkingPanel = function(type,id){
        var talking = $("#"+type+"_"+id);
        if(talking.index() != 0){
            var html = talking.clone();
            talking.remove();
            $(".my-talking").prepend(html);
        }
    };

    var removeMessageCount = function (element) {
        element.text("");
    };

    var addSysMessage = function(message){
        if(!windowView.addSysUnreadTalking(message)){
            var sys = $("#sys_0");
            if (sys.length == 0){
                sys = initSysTalking();
            }
            var count = sys.find(".unread-count").text();
            if(count == undefined){
                count = 0;
            }
            var intCount = Number(count);
            sys.find(".unread-count").text(intCount+1);
            upTalkingPanel('sys',0);
            return false;
        }
        return true;
    };

    var addFriendMessage = function (message) {
        var html = "";
        html = html+"<li class='talking-li' _type='sys' _id='"+message.message_id+"' id='sys_"+message.message_id+"'>";
        html = html+"<div class='name-desc'>";
        html = html+"<div class='talking-content'>"+message.message_content+"</div></div>";
        $(".my-talking").prepend(html);
    };

    function initSysTalking(){
        var html = "";
        html = html+"<li class='talking-li' _type='sys' _id='0' id='sys_0'>";
        html = html+"<div class='name-desc'>";
        html = html+"<div class='talking-content'>系统消息</div></div>";
        html = html+"<span class='unread-count'>1</span></li>";
        $(".my-talking").prepend(html);
        return $("#sys_0");
    }

    var addUserMessage = function (user) {
        var userTalking = $("#user_"+user.user_id);
        if (userTalking.length == 0){
            userTalking = initUserTalking(user);
        }
        var count = userTalking.find(".unread-count").text();
        if(count == undefined){
            count = 0;
        }
        var intCount = Number(count);
        userTalking.find(".unread-count").text(intCount+1);
        upTalkingPanel('user',user.user_id);
    };

    var addOrgMessage = function(org){
        var orgTalking = $("#org_"+org.organization_id);
        if (orgTalking.length == 0){
            orgTalking = initOrgTalking(org);
        }
        var count = orgTalking.find(".unread-count").text();
        if(count == undefined){
            count = 0;
        }
        var intCount = Number(count);
        orgTalking.find(".unread-count").text(intCount+1);
        upTalkingPanel('org',org.organization_id);
    };

    function initUserTalking(user){
        var html = "";
        html = html+"<li class='talking-li' _type='user' _id='"+user.user_id+"' id='user_"+user.user_id+"'>";
        if (user.user_name == null){
            html = html+"<img class='unget-userPhoto-"+user.user_id+"' src='../img/photo.jpg'>";
            html = html+"<div class='name-desc'><div class='talking-name unget-userName-"+user.user_id+"'>null</div>";
            html = html+"<div class='talking-desc'>该用户没有说明</div>";
        }else {
            if(user.user_photo == null || user.user_photo == ""){
                html = html+"<img src='../img/photo.jpg'>";
            }else{
                html = html+"<img src='"+user.user_photo+"'>";
            }
            html = html+"<div class='name-desc'><div class='talking-name'>"+user.user_name+"</div>";
            if(user.user_description == null || user.user_description == ""){
                html = html+"<div class='talking-desc'>该用户没有说明</div>";
            }else{
                html = html+"<div class='talking-desc'>"+user.user_description+"</div>";
            }
        }
        html = html+"</div><span class='unread-count'></span></li>"
        $(".my-talking").prepend(html);
        if (user.user_name == null){
            userData.ajaxGetUser(user.user_id);
        }
        return $("#user_"+user.user_id);
    }

    function initOrgTalking(org){
        var html = "";
        html = html+"<li class='talking-li' _type='org' _id='"+org.organization_id+"' id='org_"+org.organization_id+"'>";
        if (org.organization_name == null){
            html = html+"<i class='fa fa-mobile unget-orgLogo-"+org.organization_id+"'></i><div class='name-desc'>";
            html = html+"<div class='talking-content talking-name unget-orgName-"+org.organization_id+"'>null</div>";
            orgData.getOrgAjax(org.organization_id);
        }else {
            html = html+"<i class='fa "+org.organization_logo+"'></i><div class='name-desc'>";
            html = html+"<div class='talking-content talking-name'>"+org.organization_name+"</div>";
        }
        html = html+"</div><span class='unread-count'></span></li>"
        $(".my-talking").prepend(html);
        return $("#org_"+org.organization_id);
    }

    return{
        initTalkingPanel : initTalkingPanel,
        removeUnreadCount : removeUnreadCount,
        addTalkingPanel : addTalkingPanel,
        upTalkingPanel : upTalkingPanel,
        removeMessageCount : removeMessageCount,
        addSysMessage : addSysMessage,
        addFriendMessage : addFriendMessage,
        addUserMessage : addUserMessage,
        addOrgMessage : addOrgMessage
    }
});