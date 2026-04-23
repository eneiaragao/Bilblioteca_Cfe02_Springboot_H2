package com.cef02Biblioteca.cef02.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cef02Biblioteca.cef02.model.Livro;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
    // Aqui o Spring já cria automaticamente o save(), findById(), etc.
}