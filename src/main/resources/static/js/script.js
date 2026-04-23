const API_BASE_URL = '/api';

/**
 * INICIALIZAÇÃO DO SISTEMA
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("Iniciando carregamento do sistema da Biblioteca...");
    
    carregarSelects();
    atualizarListas();

    // 1. VINCULAÇÃO DOS FORMULÁRIOS
    const formLivro = document.getElementById('form-adicionar-livro');
    if (formLivro) {
        formLivro.addEventListener('submit', function(event) {
            cadastrarLivro(event);
        });
    }

    const formUsuario = document.getElementById('form-cadastrar-usuario');
    if (formUsuario) {
        formUsuario.addEventListener('submit', function(event) {
            cadastrarUsuario(event);
        });
    }

    const formEmprestimo = document.getElementById('form-emprestimo');
    if (formEmprestimo) {
        formEmprestimo.addEventListener('submit', function(event) {
            realizarEmprestimo(event);
        });
    }

    const formDevolucao = document.getElementById('form-devolucao');
    if (formDevolucao) {
        formDevolucao.addEventListener('submit', function(event) {
            registrarDevolucao(event);
        });
    }

    const formExcluirUsuario = document.getElementById('form-excluir-usuario');
    if (formExcluirUsuario) {
        formExcluirUsuario.addEventListener('submit', function(event) {
            excluirUsuario(event);
        });
    }

    // 2. VINCULAÇÃO DOS BOTÕES DE CONSULTA
    const btnAcervo = document.getElementById('btn-acervo-completo');
    if (btnAcervo) {
        btnAcervo.onclick = function() {
            consultarAcervoCompleto();
        };
    }

    // --- CORREÇÃO DA CONSULTA DE LIVROS DISPONÍVEIS ---
    const btnLivrosDisponiveis = document.getElementById('btn-livros-disponiveis');
    if (btnLivrosDisponiveis) {
        btnLivrosDisponiveis.onclick = async function() {
            try {
                const response = await fetch(`${API_BASE_URL}/livros`);
                if (!response.ok) throw new Error("Erro ao buscar livros");
                
                const livros = await response.json();
                
                // Filtra apenas livros que têm quantidade disponível maior que 0
                const disponiveis = livros.filter(livro => livro.quantidadeDisponivel > 0);

                let relatorio = "======= LIVROS DISPONÍVEIS =======\n\n";
                
                if (disponiveis.length === 0) {
                    relatorio += "Não há livros disponíveis no momento.";
                } else {
                    disponiveis.forEach(livro => {
                        relatorio += `ID: ${livro.idLivro} | TÍTULO: ${livro.titulo.toUpperCase()}\n`;
                        relatorio += `AUTOR: ${livro.autor} | ESTOQUE: ${livro.quantidadeDisponivel}/${livro.quantidadeTotal}\n`;
                        relatorio += "------------------------------------------\n";
                    });
                }
                // Usa o alert padrão para manter a estética dos seus outros botões
                alert(relatorio);

            } catch (error) {
                console.error(error);
                alert("Erro ao carregar livros disponíveis.");
            }
        };
    }

    const btnAtivos = document.getElementById('btn-emprestimos-ativos-consulta');
    if (btnAtivos) {
        btnAtivos.onclick = function() {
            consultarEmprestimosAtivos();
        };
    }

    const btnAtrasados = document.getElementById('btn-emprestimos-atrasados-consulta');
    if (btnAtrasados) {
        btnAtrasados.onclick = function() {
            consultarEmprestimosAtrasados();
        };
    }

    const btnHistorico = document.getElementById('btn-historico-locacoes');
    if (btnHistorico) {
        btnHistorico.onclick = function() {
            consultarHistoricoCompleto();
        };
    }

    // Adicione isso dentro do seu document.addEventListener('DOMContentLoaded', ...)
const inputBusca = document.getElementById('inputBusca');
if (inputBusca) {
    inputBusca.addEventListener('input', function() {
        executarBuscaDinamica(this.value);
    });
}

// Função que faz a mágica da busca
async function executarBuscaDinamica(termo) {
    const divResultado = document.getElementById('resultadoBusca');
    
    if (termo.length < 2) {
        divResultado.innerHTML = ""; // Só busca se digitar pelo menos 2 letras
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/livros`);
        const livros = await response.json();
        
        // Filtra os livros pelo termo digitado (Título, Autor ou ISBN)
        const filtrados = livros.filter(l => 
            l.titulo.toLowerCase().includes(termo.toLowerCase()) ||
            l.autor.toLowerCase().includes(termo.toLowerCase()) ||
            l.isbn.includes(termo)
        );

        if (filtrados.length === 0) {
            divResultado.innerHTML = "<span style='color: red;'>Nenhum livro encontrado.</span>";
        } else {
            let html = `<ul style="list-style: none; padding: 0; border: 1px solid #ccc; background: white;">`;
            filtrados.slice(0, 5).forEach(l => { // Mostra os 5 primeiros resultados
                html += `<li style="padding: 8px; border-bottom: 1px solid #eee;">
                    <strong>${l.titulo.toUpperCase()}</strong> - ${l.autor} 
                    <br><small>ISBN: ${l.isbn} | Disponível: ${l.quantidadeDisponivel}/${l.quantidadeTotal}</small>
                </li>`;
            });
            html += "</ul>";
            divResultado.innerHTML = html;
        }
    } catch (e) {
        console.error("Erro na busca:", e);
    }
}
});

/**
 * FUNÇÕES AUXILIARES DE INTERFACE (MANTIDAS)
 */
function exibirRelatorioNaTela(titulo, texto) {
    const modal = document.getElementById('modalRelatorio');
    const conteudo = document.getElementById('conteudoRelatorio');
    const tituloH2 = document.getElementById('tituloRelatorio');

    if (!modal) {
        alert(titulo + "\n\n" + texto);
        return;
    }

    tituloH2.innerText = titulo;
    conteudo.innerText = texto;
    modal.style.display = "block";
}

function fecharModal() {
    const modal = document.getElementById('modalRelatorio');
    if (modal) modal.style.display = "none";
}

/**
 * SEÇÃO: FUNÇÕES DE CONSULTA
 */
async function consultarAcervoCompleto() {
    try {
        const response = await fetch(`${API_BASE_URL}/livros`);
        if (!response.ok) throw new Error("Erro ao buscar livros");
        const livros = await response.json();
        let relatorio = "======= ACERVO COMPLETO =======\n\n";
        if (livros.length === 0) {
            relatorio += "Nenhum livro cadastrado.";
        } else {
            livros.forEach(livro => {
                relatorio += `ID: ${livro.idLivro} | TÍTULO: ${livro.titulo.toUpperCase()}\n`;
                relatorio += `AUTOR: ${livro.autor} | ESTOQUE: ${livro.quantidadeDisponivel}/${livro.quantidadeTotal}\n`;
                relatorio += "------------------------------------------\n";
            });
        }
        alert(relatorio);
    } catch (error) {
        alert("Erro ao carregar o acervo.");
    }
}

async function consultarEmprestimosAtivos() {
    try {
        const response = await fetch(`${API_BASE_URL}/emprestimos/ativos`);
        const lista = await response.json();
        let relatorio = "EMPRÉSTIMOS EM ANDAMENTO\n\n";
        if (lista.length === 0) {
            relatorio += "Não há livros emprestados no momento.";
        } else {
            lista.forEach(emp => {
                const usuario = emp.aluno ? `Aluno: ${emp.aluno.nome}` : `Prof: ${emp.professor.nome}`;
                relatorio += `ID: ${emp.id} | Livro: ${emp.livro.titulo}\n`;
                relatorio += `Usuário: ${usuario} | Devolução: ${emp.dataDevolucaoPrevista}\n`;
                relatorio += "------------------------------------------\n";
            });
        }
        alert(relatorio);
    } catch (error) {
        alert("Erro ao buscar empréstimos ativos.");
    }
}

async function consultarEmprestimosAtrasados() {
    try {
        const response = await fetch(`${API_BASE_URL}/emprestimos/atrasados`);
        const lista = await response.json();
        let relatorio = "!!! ALERTA DE ATRASOS !!!\n\n";
        if (lista.length === 0) {
            relatorio += "Não há devoluções pendentes em atraso.";
        } else {
            lista.forEach(emp => {
                const usuario = emp.aluno ? emp.aluno.nome : (emp.professor ? emp.professor.nome : "N/A");
                relatorio += `ID: ${emp.id} | Livro: ${emp.livro.titulo}\n`;
                relatorio += `Usuário: ${usuario} | Venceu em: ${emp.dataDevolucaoPrevista}\n`;
                relatorio += "------------------------------------------\n";
            });
        }
        alert(relatorio);
    } catch (error) {
        alert("Erro ao buscar atrasos.");
    }
}

async function consultarHistoricoCompleto() {
    try {
        // Em vez de uma rota que dá erro 405, vamos buscar onde sabemos que funciona:
        const [resAtivos, resAtrasados] = await Promise.all([
            fetch(`${API_BASE_URL}/emprestimos/ativos`),
            fetch(`${API_BASE_URL}/emprestimos/atrasados`)
        ]);

        if (!resAtivos.ok || !resAtrasados.ok) throw new Error("Erro ao acessar sub-rotas");

        const ativos = await resAtivos.json();
        const atrasados = await resAtrasados.json();
        
        // Juntamos as duas listas
        const listaTotal = [...ativos, ...atrasados];

        let textoAlunos = "--- LOCAÇÕES: ALUNOS ---\n";
        let textoProfs = "\n--- LOCAÇÕES: PROFESSORES ---\n";
        let temA = false, temP = false;

        listaTotal.forEach(emp => {
            const titulo = (emp.livro && emp.livro.titulo) ? emp.livro.titulo.toUpperCase() : "LIVRO";
            const status = atrasados.some(atr => atr.id === emp.id) ? "(! ATRASADO)" : "(Em dia)";
            const linha = `• ${titulo} ${status}\n  Prazo: ${emp.dataDevolucaoPrevista || "S/D"}\n`;

            if (emp.aluno) {
                textoAlunos += `ALUNO: ${emp.aluno.nome || "Estudante"}\n${linha}\n`;
                temA = true;
            } else if (emp.professor) {
                textoProfs += `PROF: ${emp.professor.nome || "Professor"}\n${linha}\n`;
                temP = true;
            }
        });

        const msg = "======= RELATÓRIO DE EMPRÉSTIMOS ATUAIS =======\n\n" + 
                    (temA ? textoAlunos : "Nenhum aluno com livro.\n") + 
                    (temP ? textoProfs : "\nNenhum professor com livro.");

        alert(msg);

    } catch (error) {
        console.error("Erro ao tentar contornar o 405:", error);
        alert("O servidor não permite listar o histórico total (Erro 405).\nExibindo apenas empréstimos em aberto.");
    }
}

/**
 * SEÇÃO: OPERAÇÕES (CADASTROS E OUTROS)
 */
async function cadastrarUsuario(event) {
    event.preventDefault();
    const tipo = document.getElementById('tipo_usuario_novo').value;
    const nome = document.getElementById('nome_usuario_novo').value;
    const matricula = document.getElementById('matricula_aluno').value;
    const telefone = document.getElementById('contato_usuario_novo').value;

    const usuario = { nome, telefone };
    let rota = tipo === 'aluno' ? '/alunos' : '/professores';
    if (tipo === 'aluno') usuario.matricula = matricula;

    try {
        const response = await fetch(`${API_BASE_URL}${rota}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });

        if (response.ok) {
            alert("Usuário cadastrado com sucesso!");
            event.target.reset();
            carregarSelects();
        } else {
            alert("Erro ao cadastrar usuário.");
        }
    } catch (error) {
        alert("Erro na comunicação com o servidor.");
    }
}

async function cadastrarLivro(event) {
    event.preventDefault(); // Impede que a página recarregue

    // 1. Captura os valores atuais dos campos
    const inputTitulo = document.getElementById('titulo');
    const livro = {
        titulo: inputTitulo.value,
        autor: document.getElementById('autor').value,
        anoPublicacao: parseInt(document.getElementById('ano_publicacao').value),
        isbn: document.getElementById('isbn').value,
        editora: document.getElementById('editora').value,
        genero: document.getElementById('genero').value,
        quantidadeTotal: parseInt(document.getElementById('quantidade_total').value),
        quantidadeDisponivel: parseInt(document.getElementById('quantidade_total').value)
    };

    try {
        const response = await fetch(`${API_BASE_URL}/livros`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livro)
        });

        if (response.ok) {
            alert(`Sucesso! "${livro.titulo}" foi adicionado ao acervo.`);
            
            // 2. O PULO DO GATO: Limpa o formulário completamente
            event.target.reset(); 
            
            // 3. Coloca o mouse de volta no Título automaticamente
            inputTitulo.focus(); 
            
            // 4. Atualiza as listas e selects para o próximo cadastro refletir os dados novos
            carregarSelects();
            if (typeof atualizarListas === "function") atualizarListas();

        } else {
            const erroData = await response.json();
            alert("Erro ao cadastrar: " + (erroData.message || "Verifique se os dados estão corretos."));
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro de conexão com o servidor.");
    }
}

async function carregarSelects() {
    try {
        const [resL, resA, resP] = await Promise.all([
            fetch(`${API_BASE_URL}/livros`),
            fetch(`${API_BASE_URL}/alunos`),
            fetch(`${API_BASE_URL}/professores`)
        ]);

        const livros = await resL.json();
        const alunos = await resA.json();
        const profs = await resP.json();

        const selectLivro = document.getElementById('select-livro');
        if (selectLivro) {
            selectLivro.innerHTML = '<option value="">-- Selecione um Livro --</option>';
            livros.forEach(livro => {
                const opt = new Option(`${livro.titulo} (${livro.quantidadeDisponivel} disp.)`, livro.idLivro);
                if (livro.quantidadeDisponivel <= 0) opt.disabled = true;
                selectLivro.add(opt);
            });
        }

        const selectU = document.getElementById('select-usuario');
        const selectE = document.getElementById('select-usuario-excluir');
        [selectU, selectE].forEach(s => {
            if (s) {
                s.innerHTML = '<option value="">-- Selecione o Usuário --</option>';
                alunos.forEach(a => {
                    let opt = new Option(`${a.nome} (Aluno)`, a.idAluno);
                    opt.dataset.tipo = 'aluno';
                    s.add(opt);
                });
                profs.forEach(p => {
                    let opt = new Option(`${p.nome} (Prof)`, p.idProfessor);
                    opt.dataset.tipo = 'professor';
                    s.add(opt);
                });
            }
        });
    } catch (e) { console.error(e); }
}

async function realizarEmprestimo(event) {
    event.preventDefault();
    const sL = document.getElementById('select-livro');
    const sU = document.getElementById('select-usuario');
    const optU = sU.options[sU.selectedIndex];
    if (!sL.value || !sU.value) return alert("Preencha tudo.");

    const payload = {
        livro: { idLivro: parseInt(sL.value) },
        dataDevolucaoPrevista: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0]
    };
    if (optU.dataset.tipo === 'aluno') payload.aluno = { idAluno: parseInt(sU.value) };
    else payload.professor = { idProfessor: parseInt(sU.value) };

    try {
        const r = await fetch(`${API_BASE_URL}/emprestimos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (r.ok) { alert("Sucesso!"); carregarSelects(); atualizarListas(); }
    } catch (e) { alert("Erro."); }
}

async function registrarDevolucao(event) {
    event.preventDefault();
    const id = document.getElementById('id-emprestimo-devolucao').value;
    try {
        const r = await fetch(`${API_BASE_URL}/emprestimos/devolucao/${id}`, { method: 'POST' });
        if (r.ok) { alert("Devolvido!"); carregarSelects(); atualizarListas(); }
    } catch (e) { alert("Erro."); }
}

async function excluirUsuario(event) {
    event.preventDefault();
    const s = document.getElementById('select-usuario-excluir');
    const opt = s.options[s.selectedIndex];
    if (!s.value) return;
    if (confirm("Excluir?")) {
        const rota = opt.dataset.tipo === 'aluno' ? '/alunos' : '/professores';
        await fetch(`${API_BASE_URL}${rota}/${s.value}`, { method: 'DELETE' });
        carregarSelects();
    }
}

async function atualizarListas() {
    try {
        const [resAt, resAtr] = await Promise.all([
            fetch(`${API_BASE_URL}/emprestimos/ativos`),
            fetch(`${API_BASE_URL}/emprestimos/atrasados`)
        ]);
        
        const ativos = await resAt.json();
        const atrasados = await resAtr.json();

        const lAt = document.getElementById('lista-emprestimos-ativos');
        const lAtr = document.getElementById('lista-emprestimos-atrasados');

        // Função interna para formatar a data de YYYY-MM-DD para DD/MM/AAAA
        const formatarData = (dataStr) => {
            if (!dataStr) return "S/D";
            const partes = dataStr.split('-');
            return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : dataStr;
        };

        if (lAt) {
            lAt.innerHTML = ativos.map(e => {
                const nomeUsuario = e.aluno ? e.aluno.nome : (e.professor ? e.professor.nome : "Usuário");
                const tituloLivro = e.livro ? e.livro.titulo : "Livro";
                const dataFormatada = formatarData(e.dataDevolucaoPrevista);
                
                return `<li style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; list-style: none;">
                            <span style="color: #27ae60; font-weight: bold;">[ID: ${e.id}]</span> 
                            <strong>${nomeUsuario}</strong> 
                            <br>📖 <em>${tituloLivro}</em> 
                            <br><small>📅 Devolução em: ${dataFormatada}</small>
                        </li>`;
            }).join('') || "<li>Nenhum empréstimo no prazo.</li>";
        }

        if (lAtr) {
            lAtr.innerHTML = atrasados.map(e => {
                const nomeUsuario = e.aluno ? e.aluno.nome : (e.professor ? e.professor.nome : "Usuário");
                const tituloLivro = e.livro ? e.livro.titulo : "Livro";
                const dataFormatada = formatarData(e.dataDevolucaoPrevista);
                
                return `<li style="margin-bottom: 10px; border-bottom: 1px solid #ffcccc; padding-bottom: 5px; list-style: none; background-color: #fff5f5;">
                            <span style="color: #c0392b; font-weight: bold;">[ID: ${e.id}]</span> 
                            <strong>${nomeUsuario}</strong> 
                            <br>📖 <em>${tituloLivro}</em> 
                            <br><small style="color: #c0392b;">⚠️ Venceu em: ${dataFormatada}</small>
                        </li>`;
            }).join('') || "<li>Nenhum empréstimo atrasado.</li>";
        }
    } catch (e) { 
        console.error("Erro ao atualizar listas da tela:", e); 
    }
}



async function gerarRelatorioPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const margemX = 20;
    let y = 20;

    // --- CABEÇALHO ---
    doc.setFillColor(44, 62, 80); // Cor azul escuro
    doc.rect(0, 0, 210, 40, 'F'); // Faixa no topo
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("RELATÓRIO DE EMPRÉSTIMO ", 105, 20, { align: "center" });
    
    
    doc.setFontSize(10);
    
    doc.setFont("helvetica", "normal");
    doc.text(`Data de Emissão: ${new Date().toLocaleString('pt-BR')}`, 105, 30, { align: "center" });

    y = 55;

    const limparTexto = (t) => t.replace(/[📘⚠️📖📅]/g, '').replace(/\s\s+/g, ' ').trim();

    const desenharTabela = (titulo, idLista, corRGB) => {
        const itens = document.querySelectorAll(`#${idLista} li`);
        
        // Título da Seção
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(corRGB[0], corRGB[1], corRGB[2]);
        doc.text(titulo, margemX, y);
        y += 8;
        
        // Linha abaixo do título
        doc.setDrawColor(corRGB[0], corRGB[1], corRGB[2]);
        doc.line(margemX, y, 190, y);
        y += 10;

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");

        if (itens.length === 0 || itens[0].innerText.includes("Nenhum")) {
            doc.text("Nenhum registro encontrado nesta categoria.", margemX + 5, y);
            y += 15;
        } else {
            itens.forEach(item => {
                const texto = limparTexto(item.innerText);
                const linhas = doc.splitTextToSize(texto, 160);
                const alturaRetangulo = (linhas.length * 7) + 6;

                // Desenha o quadro (tabela) para o item
                doc.setDrawColor(200, 200, 200); // Cinza claro
                doc.rect(margemX, y - 5, 170, alturaRetangulo); 
                
                // Texto dentro do quadro
                doc.text(linhas, margemX + 5, y + 2);
                
                y += alturaRetangulo + 5; // Pula para o próximo quadro

                if (y > 270) {
                    doc.addPage();
                    y = 25;
                }
            });
        }
        y += 10;
    };

    // Gerar Seções
    desenharTabela("EMPRÉSTIMOS ATIVOS (NO PRAZO)", "lista-emprestimos-ativos", [39, 174, 96]);
    desenharTabela("EMPRÉSTIMOS VENCIDOS (ATRASADOS)", "lista-emprestimos-atrasados", [192, 57, 43]);

    // Rodapé
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Documento gerado automaticamente pelo Sistema de Biblioteca", 105, 290, { align: "center" });

    doc.save(`Relatorio_Biblioteca_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`);
}
