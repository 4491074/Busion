/**
 * Created by wangwenxiang on 16-1-11.
 */
define(['jquery'],function($){
        /**
         * 所有好友数据
         */
        var myOrganizationArray = [];

        var allOrganizationArray = [];

    var getOrgData = function(orgId){
        var org = null;
        $.each(myOrganizationArray,function(i,item){
            if (item.organization_id == orgId){
                org = item;
            }
        });
        $.each(allOrganizationArray,function(i,item){
            if (item.organization_id == orgId){
                org = item;
            }
        });
        if (org != null){
            org = {
                organization_id: org.organization_user_organization,
                organization_name: org.organization_name,
                organization_logo: org.organization_logo
            }
        }
        return org;
    };
    /**
     * 返回我的所有组织信息
     * @returns {Array}
     */
    var getAll = function(){
        return myOrganizationArray;
    };

    /**
     * 添加我的组织
     * @param item
     */
    var addMyOrganization = function(item){
        var myOrganization = {
            organization_id: item.organization_user_organization,
            organization_name: item.organization_name,
            organization_logo: item.organization_logo,
            organization_user_manage: item.organization_user_manage
        };
        myOrganizationArray.push(myOrganization);
    };

    /**
     * 根据parent获取组织集合
     * @param parent
     * @param floor
     */
    var getAllOrg = function(parent){
        var org = [];
        var organization_load_user = 0;
        var organization_user_list = [];
        $.each(allOrganizationArray,function(i,item){
            if(item.organization_parent==parent){
                org.push(item);
            }else if(item.organization_id == parent){
                if(parent != 1){
                    organization_load_user = item.organization_load_user;
                    organization_user_list = item.organization_user_list;
                }
            }
        });
        var pamars = {
            org : org,
            load : organization_load_user,
            list : organization_user_list
        };
        return pamars;
    };

    /**
     * 获取的组织信息
     */
    var getMyOrg = function(orgId){
        var org = null;
        $.each(myOrganizationArray,function(i,item){
            if(item.organization_id==orgId) {
                org = item;
            }
        });
        if(org == null){
            $.each(allOrganizationArray,function(i,item){
                if(item.organization_id==orgId) {
                    org = item;
                }
            });
        }
        return org;
    };

    /**
     * 添加一条组织信息
     * @param item
     */
    var addAllOrganization = function (item) {
        var org = {
            organization_id: item.organization_id,
            organization_name: item.organization_name,
            organization_logo: item.organization_logo,
            organization_floor : item.organization_floor,
            organization_parent : item.organization_parent,
            organization_load_user : 1,
            organization_user_list: []
        }
        allOrganizationArray.push(org);
    }

    var getOrgById = function (id) {
        var org = null;
        $.each(myOrganizationArray,function(i,item){
            if(item.organization_id==id){
                org = item;
            }
        });
        return org;
    };

    var setAllOrgUserList = function (orgId,ids) {
        $.each(allOrganizationArray,function(i,item){
            if(item.organization_id==orgId){
                item.organization_user_list = ids;
                item.organization_load_user = 2;
            }
        });
    };

    return{
        getAll : getAll,
        addMyOrganization : addMyOrganization,
        getAllOrg : getAllOrg,
        addAllOrganization :addAllOrganization,
        getOrgById:getOrgById,
        setAllOrgUserList : setAllOrgUserList,
        getMyOrg : getMyOrg,
        getOrgData : getOrgData
    }
});