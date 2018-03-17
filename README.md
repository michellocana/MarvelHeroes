# Setup React Native
As seguintes ferramentas são necessárias para testar o app em modo de debug (Android):
* Node
* Python2
* JDK
* Android Studio

Após fazer a instalação dessas ferramentas, é necessário confirmar se as seguintes variáveis de ambiente estão configuradas corretamente:
* ANDROID_HOME
* JAVA_HOME

# Rodando o projeto sem setup
Na pasta ``bin`` do projeto, existe uma APK atualizada do app pronta para ser instalada, caso não deseje instalar as dependências do React Native.

# Rodando o projeto com setup
Após instalar as dependências acima, instale a CLI do React Native usando o comando ``npm i -g react-native``.

Após instalar a CLI, basta ir na pasta do projeto e rodar ``react-native run-android``

# Mais informações
Um passo a passo mais detalhado está disponivel [nesse link](https://facebook.github.io/react-native/docs/getting-started.html).
