from bs4 import BeautifulSoup

# Ler o arquivo HTML original
with open('curso.html', 'r', encoding='utf-8') as file:
    soup = BeautifulSoup(file, 'html.parser')

# Encontrar todos os elementos <div class="video-wrapper">
video_wrappers = soup.find_all('div', class_='video-wrapper')

# Modificar os links do YouTube
for wrapper in video_wrappers:
    original_src = wrapper.get('data-src')
    if original_src and 'youtube.com/embed/' in original_src:
        # Adicionar ?rel=0&showinfo=0 se não houver parâmetros, ou &rel=0&showinfo=0 se houver
        if '?' in original_src:
            new_src = original_src + '&rel=0&showinfo=0'
        else:
            new_src = original_src + '?rel=0&showinfo=0'
        wrapper['data-src'] = new_src

# Gerar o novo arquivo HTML
with open('curso-cópia.html', 'w', encoding='utf-8') as file:
    file.write(str(soup))