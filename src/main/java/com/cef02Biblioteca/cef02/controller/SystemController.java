package com.cef02Biblioteca.cef02.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SystemController {

    @Autowired
    private ConfigurableApplicationContext context;

    @PostMapping("/api/system/shutdown")
    public void shutdown() {
        System.out.println("Encerrando o sistema CEF 02 em 2 segundos...");

        // Cria uma nova thread para fechar o sistema após 2 segundos
        // Isso dá tempo do navegador receber a resposta de sucesso
        new Thread(() -> {
            try {
                Thread.sleep(2000); // Espera 2 segundos
                context.close();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();
    }
}
