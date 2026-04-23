package com.cef02Biblioteca.cef02.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/")
    public String carregarIndex() {
        return "index"; // O Spring vai procurar index.html dentro de 'templates'
    }
}