package com.cef02Biblioteca.cef02.Service;

import com.cef02Biblioteca.cef02.model.*;
import com.cef02Biblioteca.cef02.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
public class EmprestimoService {

    @Autowired private EmprestimoRepository repo;
    @Autowired private LivroRepository livroRepo;

    @Transactional
    public Emprestimo realizarEmprestimo(Emprestimo emp) {
        Livro livro = livroRepo.findById(emp.getLivro().getIdLivro())
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        if (livro.getQuantidadeDisponivel() <= 0) {
            throw new RuntimeException("Estoque esgotado");
        }

        if (emp.getAluno() != null && emp.getAluno().getIdAluno() == null) emp.setAluno(null);
        if (emp.getProfessor() != null && emp.getProfessor().getIdProfessor() == null) emp.setProfessor(null);

        livro.setQuantidadeDisponivel(livro.getQuantidadeDisponivel() - 1);
        livroRepo.save(livro);
        
        emp.setDataEmprestimo(LocalDate.now());
        return repo.save(emp);
    }

    public List<Emprestimo> listarAtivos() {
        return repo.findByDataDevolucaoRealIsNull();
    }

    public List<Emprestimo> listarAtrasados() {
        return repo.buscarAtrasados();
    }

    @Transactional
    public void registrarDevolucao(Long id) {
        Emprestimo emp = repo.findById(id).orElseThrow();
        if (emp.getDataDevolucaoReal() == null) {
            emp.setDataDevolucaoReal(LocalDate.now());
            Livro l = emp.getLivro();
            l.setQuantidadeDisponivel(l.getQuantidadeDisponivel() + 1);
            livroRepo.save(l);
            repo.save(emp);
        }
    }
}