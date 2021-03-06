package com.wang.serivce.message;

import com.alibaba.fastjson.JSONObject;
import com.wang.domain.Message;

/**
 * Created BY wangwenxing on 4/30/16.
 */
public interface MessageHandle<T> {

    /**
     * 消息解析,将前端消息解析成message对象
     * @param jsonObject json
     * @return message
     */
    T parseMessage(final JSONObject jsonObject,int sender);

    /**
     * 消息持久化
     * @param message 消息
     * @return 是否成功
     */
    boolean persistMessage(final T message);

    /**
     * 消息推送
     */
    void pushMessage(T message);
}
