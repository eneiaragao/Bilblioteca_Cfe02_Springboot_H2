package com.cef02Biblioteca.cef02.controller;

import com.cef02Biblioteca.cef02.model.Aluno;
import com.cef02Biblioteca.cef02.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alunos")
@CrossOrigin(origins = "*")
public class AlunoController {

    @Autowired
    private AlunoRepository repository;

    @GetMapping
    public List<Aluno> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Aluno salvar(@RequestBody Aluno aluno) {
        return repository.save(aluno);
    }

    @DeleteMapping("/{id}")
public ResponseEntity<?> excluir(@PathVariable Long id) {
    return repository.findById(id).map(aluno -> {
        // Verifica se há empréstimos sem data de devolução real
        boolean temPendencia = aluno.getEmprestimos().stream()
                .anyMatch(e -> e.getDataDevolucaoReal() == null);
        
        if (temPendencia) {
            return ResponseEntity.badRequest().body("O aluno possui livros pendentes e não pode ser excluído.");
        }
        
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }).orElse(ResponseEntity.notFound().build());
}
}