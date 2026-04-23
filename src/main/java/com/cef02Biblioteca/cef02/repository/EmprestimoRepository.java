package com.cef02Biblioteca.cef02.repository;

import com.cef02Biblioteca.cef02.model.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findByDataDevolucaoRealIsNull();

    @Query("SELECT e FROM Emprestimo e WHERE e.dataDevolucaoReal IS NULL AND e.dataDevolucaoPrevista < CURRENT_DATE")
    List<Emprestimo> buscarAtrasados();
}