package com.cef02Biblioteca.cef02.repository;



import com.cef02Biblioteca.cef02.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    // O JpaRepository já nos dá: save(), delete(), findById(), findAll()
    // Se precisar buscar por matrícula depois, podemos adicionar aqui.
}