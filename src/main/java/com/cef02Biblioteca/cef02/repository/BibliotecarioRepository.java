package com.cef02Biblioteca.cef02.repository;

import com.cef02Biblioteca.cef02.model.Bibliotecario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BibliotecarioRepository extends JpaRepository<Bibliotecario, Long> {
    // Útil para o futuro login:
    // Bibliotecario findByLogin(String login);
}