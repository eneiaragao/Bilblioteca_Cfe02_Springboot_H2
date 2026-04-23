package com.cef02Biblioteca.cef02.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAluno;
    
    private String nome;
    
    @Column(unique = true)
    private String matricula;
    
    private String telefone;

    // Adicione este bloco:
    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Importante para não dar erro de loop infinito no JSON
    private List<Emprestimo> emprestimos;
}