package com.cef02Biblioteca.cef02.controller;

import com.cef02Biblioteca.cef02.model.Professor;
import com.cef02Biblioteca.cef02.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/professores")
@CrossOrigin(origins = "*")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping
    public List<Professor> listarTodos() {
        return professorRepository.findAll();
    }

   @PostMapping
public Professor adicionar(@RequestBody Professor professor) {
    if (professor == null) {
        throw new RuntimeException("Professor não pode ser nulo");
    }
    return professorRepository.save(professor);
}

   @DeleteMapping("/{id}")
public void excluir(@PathVariable Long id) {
    if (id != null) {
        professorRepository.deleteById(id);
    }
}
}