import os

# Lista de arquivos com seus nomes conforme fornecidos
arquivos = [
    "curso.html",
    "login.html",
    "login.js",
    "produtor.html",
    "produtor.js",
    "styles.css",
    "index.html"
]

# Nome do arquivo de saída
arquivo_saida = "todos_arquivos.txt"

# Abrir o arquivo de saída em modo de escrita
with open(arquivo_saida, 'w', encoding='utf-8') as saida:
    # Iterar por cada arquivo na lista
    for arquivo in arquivos:
        try:
            # Abrir e ler o conteúdo de cada arquivo
            with open(arquivo, 'r', encoding='utf-8') as entrada:
                conteudo = entrada.read()
                
            # Escrever o título (nome do arquivo) e o conteúdo no arquivo de saída
            saida.write(f"===== {arquivo} =====\n\n")
            saida.write(conteudo)
            saida.write("\n\n")  # Adicionar duas linhas em branco após cada arquivo
            
        except FileNotFoundError:
            saida.write(f"===== {arquivo} =====\n")
            saida.write("Erro: Arquivo não encontrado\n\n")
        except Exception as e:
            saida.write(f"===== {arquivo} =====\n")
            saida.write(f"Erro ao processar o arquivo: {str(e)}\n\n")

print(f"Processamento concluído. Conteúdo salvo em {arquivo_saida}")