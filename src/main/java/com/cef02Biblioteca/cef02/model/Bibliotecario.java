package com.cef02Biblioteca.cef02.model;



import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "bibliotecarios")
public class Bibliotecario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBibliotecario;
    
    private String nome;
    
    @Column(unique = true)
    private String cpf;
    
    private String telefone;
    private String email;
    
    @Column(unique = true)
    private String login;
    
    private String senha;
}