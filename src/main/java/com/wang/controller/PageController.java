package com.wang.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Controller
public class PageController {

    /**
     * 用户登陆页面跳转
     */
    @RequestMapping("login")
    public String userLoginPage(){
        return "login.jsp";
    }

    /**
     * 用户注册页面跳转
     */
    @RequestMapping("register")
    public String userRegisterPage(){
        return "register.jsp";
    }

    /**
     * 主页面跳转
     */
    @RequestMapping("main")
    public String main(HttpSession session,HttpServletResponse response){
        Object o = session.getAttribute("user");
        if (o == null){
            return "redirect:login";
        }
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Cache-Control", "no-store");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        return "main.html";
    }


    @RequestMapping("signout")
    public String signout(HttpSession session, HttpServletResponse response) throws IOException {
        session.removeAttribute("user");
        response.sendRedirect("login");
        return null;
    }
}
