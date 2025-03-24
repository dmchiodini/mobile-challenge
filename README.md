# Mobile Challenge

## Descrição
Um aplicativo de dicionário de palavras em inglês. Permite pesquisar palavras, visualizar fonética, significados e sinônimos, ouvir a pronúncia e salvar favoritos. Inclui um histórico de palavras visitadas.

## Tecnologias Utilizadas
- **React-Native**
- **Typescript**
- **Expo**
- **Firebase**
- **Tanstack Query**
- **Expo Router**
- **Expo-AV**
- **Async Storage**
- **React Native Material**

## Instalação e Uso

### Requisitos
- Node.js instalado
- Expo CLI instalado globalmente (`npm install -g expo-cli`)
- Emulador ou dispositivo físico com o aplicativo Expo Go

### Passos para instalar

**Clone este repositório**
```sh
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

**Acesse a pasta do projeto**
```sh
cd nome-do-repositorio
```

**Instale as dependências**
```sh
npm install
```

**Execute o projeto**
```sh
npm run start
```

## Como rodar
- Para rodar no **emulador**, utilize um emulador configurado com **Android Studio** ou **Xcode**.
- Para rodar em um **dispositivo físico**, escaneie o **QR Code** fornecido pelo **Expo** com o aplicativo **Expo Go**.

## Como Usar
1. **Entre** com seu e-mail e senha.
2. Se for um **novo usuário**, acesse a tela de **cadastro** clicando em: "**Cadastre-se**" e crie uma conta fornecendo um e-mail e senha.
3. Na **tela principal**, visualize uma **lista de palavras** com rolagem infinita.
4. Você pode utilizar o campo de pesquisa para encontrar uma palavra específica ou selecionar através da lista.
5. **Clique** na palavra desejada para abrir um **modal** com informações detalhadas:
   - **Fonética**
   - **Significado**
   - **Sinônimos**
6. Para **favoritar** ou **remover** uma palavra dos favoritos, clique no ícone de **estrela**.
   - **Estrela amarela** indica que a palavra está na lista de favoritos.
7. Clique no ícone **"play"** para **ouvir a pronúncia** da palavra (se disponível).
8.  Você pode navegar entre as palavras da lista pressionando os botões **Voltar** e **Próximo**
9. No **menu de navegação**, acesse:
   - **Lista de palavras**: Lista de palavras com rolagem infinita.
   - **Histórico**: Lista de palavras já visitadas.
   - **Favoritos**: Lista de palavras marcadas como favoritas.
10. Em **qualquer tela**, clique em uma palavra da lista para visualizar seus detalhes.
11. Na parte superior direta da tela **"Lista de palavras (Word List)"** há um botão "Sair" onde é possível deslogar do sistema e retornar a tela de **Login**.

## .gitignore
Certifique-se de incluir um arquivo `.gitignore` para evitar o versionamento de arquivos desnecessários, como:

```
# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
expo-env.d.ts

# Native
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# local env files
.env*.local

# typescript
*.tsbuildinfo
```

This is a challenge by [Coodesh](https://coodesh.com/)
