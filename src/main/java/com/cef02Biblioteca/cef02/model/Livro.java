package com.cef02Biblioteca.cef02.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLivro;
    private String titulo;
    private String autor;
    private Integer anoPublicacao;
    @Column(unique = true)
    private String isbn;
    private String editora;
    private String genero;
    private Integer quantidadeTotal;
    private Integer quantidadeDisponivel;

    @OneToMany(mappedBy = "livro", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Emprestimo> emprestimos;
}