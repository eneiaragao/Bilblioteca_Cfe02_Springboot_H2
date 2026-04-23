package com.cef02Biblioteca.cef02.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cef02Biblioteca.cef02.model.Livro;
import com.cef02Biblioteca.cef02.repository.LivroRepository;

@RestController
@RequestMapping("/api/livros")
@CrossOrigin(origins = "*")
public class LivroController {

    @Autowired
    private LivroRepository livroRepository;

    @GetMapping
    public List<Livro> listarTodos() {
        return livroRepository.findAll();
    }

    @PostMapping
    public Livro adicionar(@RequestBody Livro livro) {
        if (livro.getQuantidadeDisponivel() == null) {
            livro.setQuantidadeDisponivel(livro.getQuantidadeTotal());
        }
        return livroRepository.save(livro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        return livroRepository.findById(id).map(livro -> {
            boolean temEmprestimoAtivo = livro.getEmprestimos().stream()
                .anyMatch(e -> e.getDataDevolucaoReal() == null);
            if (temEmprestimoAtivo) {
                return ResponseEntity.badRequest()
                    .body("Não é possível excluir o livro: ele está emprestado no momento.");
            }
            livroRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}