@echo off
TITLE Sistema Biblioteca - CEF 02 (Versao Portatil)
cls

echo ============================================================
echo           INICIALIZADOR DO SISTEMA - CEF 02
echo ============================================================
echo.
echo [INFO] O navegador abrira em instantes...
echo [INFO] Aguarde o carregamento completo do sistema.
echo.

:: --- SOLUCAO PARA O NAVEGADOR ---
:: Criamos um processo independente que espera 20 segundos em "background"
:: e depois abre o endereço, sem travar o restante do script.
start /min cmd /c "timeout /t 20 >nul && start http://localhost:8080"

:: --- EXECUCAO DO SISTEMA ---
:: Agora chamamos o Java. Ele vai ocupar este terminal.
".\java\bin\java.exe" -jar cef02-0.0.1-SNAPSHOT.jar

pause