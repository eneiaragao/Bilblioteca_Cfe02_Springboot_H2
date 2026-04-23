package com.cef02Biblioteca.cef02.repository;

import com.cef02Biblioteca.cef02.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
}