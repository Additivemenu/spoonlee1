package com.example.cruddemorecode.exception;

/**
 * @author xueshuo
 * @create 2023-01-26 11:21 am
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(){
        super("Resource not found!");
    }

    // 指明哪个resource not found
    public ResourceNotFoundException(String resource){
        super(resource + " not found!");
    }

}
