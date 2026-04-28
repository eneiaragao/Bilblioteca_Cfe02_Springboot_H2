# 📚 Sistema de Gestão de Biblioteca - CEF 02 Arapoanga

Este projeto é uma aplicação completa para a gestão de acervo bibliográfico e controle de empréstimos da escola **CEF 02 do Arapoanga**. Foi desenvolvido como parte do **Estágio Supervisionado** de **Eneias Aragão**, graduando em **Ciências da Computação**.

---

## 🚀 Tecnologias Utilizadas

A aplicação utiliza as tecnologias mais modernas do ecossistema Java para garantir performance e facilidade de manutenção:

*   **Linguagem:** Java 17
*   **Framework:** [Spring Boot 3.4.3](https://spring.io)
*   **Banco de Dados:** [H2 Database](https://h2database.com) (Persistência em arquivo local)
*   **Persistência:** Spring Data JPA / Hibernate
*   **Frontend:** HTML5, CSS3, JavaScript e Thymeleaf
*   **Ferramenta de Build:** Maven
*   **Controle de Versão:** Git & GitHub

---

## 🛠️ Funcionalidades

- ✅ **Gestão de Livros:** Cadastro detalhado com Título, Autor, ISBN, Editora, Ano de Publicação e Gênero.
- ✅ **Controle de Estoque:** Gestão automática de quantidade total e exemplares disponíveis.
- ✅ **Gestão de Usuários:** Cadastros para Alunos, Professores e Bibliotecários.
- ✅ **Fluxo de Empréstimos:** Registro de saídas e entradas de livros com integridade referencial.
- ✅ **Interface Intuitiva:** Painel administrativo responsivo para uso rápido na secretaria escolar.

---

## 📁 Estrutura do Banco de Dados

O projeto utiliza o banco **H2** configurado para salvar os dados em um arquivo físico na pasta `/data`, garantindo que as informações não sejam perdidas ao reiniciar a aplicação.

**Principais Entidades:**
*   `Livro`: Armazena os dados do acervo.
*   `Aluno` / `Professor`: Cadastros dos usuários da comunidade escolar.
*   `Emprestimo`: Vincula o livro ao usuário, controlando datas e status.

---

## ⚙️ Como Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com
   ```
2. **Importe o projeto:**
   Abra a pasta no VS Code ou sua IDE de preferência.
3. **Inicie a aplicação:**
   Execute o arquivo `Cef02Application.java`.
4. **Acesse as URLs:**
   - Aplicação: `http://localhost:8080`
   - Console do Banco: `http://localhost:8080/h2-console`
     - **JDBC URL:** `jdbc:h2:file:./data/bibliotecadb`
     - **User:** `sa`
     - **Password:** (em branco)

---
## ⚙️ Como Instalar e Rodar o Sistema (Versão Portátil)

Para facilitar o uso na secretaria do **CEF 02**, o sistema foi configurado para rodar sem a necessidade de instalação de softwares complexos. Siga os passos abaixo:

### 1. Baixe os Arquivos do Sistema
Baixe a pasta **`deploy`** deste repositório para o seu computador. Dentro dela, você encontrará o arquivo executável (`.jar`) e o script de inicialização (`.bat`).

### 2. Prepare o ambiente Java (JDK 17)
O sistema precisa do Java 17 para funcionar. Para manter a aplicação portátil (sem precisar instalar nada no Windows), faça o seguinte:

1. Baixe o Java Portátil aqui: [Download Java 17 (Adoptium/Temurin)](https://adoptium.net/pt-BR/download?link=https%3A%2F%2Fgithub.com%2Fadoptium%2Ftemurin17-binaries%2Freleases%2Fdownload%2Fjdk-17.0.18%252B8%2FOpenJDK17U-jdk_x64_windows_hotspot_17.0.18_8.zip&vendor=Adoptium)
2. Extraia o conteúdo do arquivo `.zip` baixado.
3. **Importante:** Renomeie a pasta extraída para apenas `java`.
4. Mova essa pasta `java` para dentro da pasta `deploy` do projeto.

### 3. Estrutura de Pastas Correta

Para que o sistema funcione, a organização dos arquivos na sua máquina deve ser exatamente esta:

```text
📂 deploy
 ├── 📂 java                <-- Pasta do Java que você baixou e renomeou
 │    └── 📂 bin
 │         └── 📄 java.exe
 ├── 📄 cef02-0.0.1-SNAPSHOT.jar
 └── 📄 iniciar_sistema.bat  <-- Clique aqui para abrir o sistema
```

---

## 👨‍💻 Desenvolvedor

**Eneias Aragão**
*Graduando em Ciências da Computação*

> "Este projeto representa a aplicação prática dos conhecimentos acadêmicos em um cenário real, contribuindo para a organização da biblioteca do CEF 02 - Arapoanga durante meu estágio supervisionado."

---

