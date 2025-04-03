<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-card class="chatbot">
              <v-card-title class="headline">
                🤖 Chorão BOT - Suporte
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item v-for="(msg, index) in messages" :key="index">
                    <v-list-item-content>
                      <v-list-item-title>
                        <b>{{ msg.sender }}:</b> {{ msg.text }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-text-field
                  v-model="userMessage"
                  label="Digite sua mensagem..."
                  outlined
                  dense
                  class="mt-2"
                  @keyup.enter="sendMessage"
                ></v-text-field>

                <v-btn
                  color="primary"
                  block
                  class="mt-2"
                  :loading="loading"
                  @click="sendMessage"
                >
                  Enviar
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import axios from 'axios';

@Component
class ChatBotComponent extends Vue {
  private userMessage: string = '';
  private messages: { sender: string; text: string }[] = [];
  private loading: boolean = false;

  private async sendMessage() {
    if (!this.userMessage.trim()) return;

    const userText = this.userMessage;
    this.messages.push({ sender: 'Você', text: userText });
    this.userMessage = '';
    this.loading = true;

    this.messages.push({ sender: 'Chorão', text: '...' });

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: userText,
      });
      const botReply = response.data.reply || 'Erro ao processar resposta.';

      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage.text === '...') {
        this.messages.pop();
      }

      this.messages.push({ sender: 'Chorão', text: botReply });
    } catch (error) {
      console.error('Erro ao se comunicar com o chatbot:', error);

      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage.text === '...') {
        this.messages.pop();
      }

      this.messages.push({
        sender: 'Chorão',
        text: 'Erro ao obter resposta. Tente novamente mais tarde.',
      });
    }

    this.loading = false;
  }

  private created() {
    if (this.messages.length > 0) return;

    setTimeout(() => {
      this.messages.push({
        sender: 'Chorão',
        text: 'Eaí, mano! Como posso ajudar hoje?',
      });
    }, 1000);
  }
}

export default toNative(ChatBotComponent);
</script>

<style scoped>
</style>
