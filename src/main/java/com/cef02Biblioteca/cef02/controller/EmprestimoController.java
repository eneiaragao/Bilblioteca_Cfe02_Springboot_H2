package com.cef02Biblioteca.cef02.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cef02Biblioteca.cef02.Service.EmprestimoService;
import com.cef02Biblioteca.cef02.model.Emprestimo;
import com.cef02Biblioteca.cef02.repository.EmprestimoRepository;

@RestController
@RequestMapping("/api/emprestimos")
@CrossOrigin(origins = "*")
public class EmprestimoController {

    @Autowired
    private EmprestimoService service;

    @Autowired
    private EmprestimoRepository repo;

    @GetMapping("/ativos")
    public List<Emprestimo> listarAtivos() {
        return repo.findByDataDevolucaoRealIsNull();
    }

    @GetMapping("/atrasados")
    public List<Emprestimo> listarAtrasados() {
        return repo.buscarAtrasados();
    }

    @PostMapping
    public Emprestimo criar(@RequestBody Emprestimo emprestimo) {
        return service.realizarEmprestimo(emprestimo);
    }

    @PostMapping("/devolucao/{id}")
    public ResponseEntity<?> devolver(@PathVariable Long id) {
        try {
            service.registrarDevolucao(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}