<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-card class="chatbot">
              <v-card-title class="headline">🤖 Chorão BOT - Suporte</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-chip-group class="mb-4" column active-class="active-suggestion">
                  <v-chip @click="useSuggestion('Como alugar uma pista?')">Como alugar uma pista?</v-chip>
                  <v-chip @click="useSuggestion('Quais são os equipamentos obrigatórios?')">Quais são os equipamentos obrigatórios?</v-chip>
                  <v-chip @click="useSuggestion('Dicas para iniciantes no skate')">Dicas para iniciantes no skate</v-chip>
                  <v-chip @click="useSuggestion('Como saber se uma pista está disponível?')">Como saber se uma pista está disponível?</v-chip>
                  <v-chip @click="useSuggestion('Modalidades de skate mais comuns')">Modalidades de skate mais comuns</v-chip>
                </v-chip-group>

                <div class="chat-box">
                  <div
                    v-for="(msg, index) in messages"
                    :key="index"
                    :class="['message-bubble', msg.sender === 'Você' ? 'user' : 'bot']"
                  >
                    <div class="sender">{{ msg.sender }}</div>
                    <div class="text">{{ msg.text }}</div>
                  </div>
                </div>

                <v-text-field
                  v-model="userMessage"
                  label="Digite sua mensagem..."
                  outlined
                  dense
                  class="mt-2"
                  @keyup.enter="sendMessage"
                />
                <v-btn color="primary" block class="mt-2" :loading="loading" @click="sendMessage">
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

  private dotInterval: any = null;

  private async sendMessage() {
    const message = this.userMessage.trim();
    if (!message) return;

    this.messages.push({ sender: 'Você', text: message });
    this.userMessage = '';
    this.loading = true;

    this.messages.push({ sender: 'Chorão', text: '.' });
    this.animateDots();

    try {
      const response = await axios.post('http://localhost:5000/chat', { message });
      const botReply = response.data.reply || 'Não consegui entender, tente reformular a pergunta.';
      this.updateLastBotMessage(botReply);
    } catch (error) {
      console.error('Erro no bot:', error);
      this.updateLastBotMessage('Erro ao se comunicar. Tente novamente mais tarde.');
    }

    this.loading = false;
  }

  private updateLastBotMessage(text: string) {
    this.stopDots();
    const last = this.messages[this.messages.length - 1];
    if (last.text === '.' || last.text === '..' || last.text === '...') this.messages.pop();
    this.messages.push({ sender: 'Chorão', text });
  }

  private useSuggestion(suggestion: string) {
    this.userMessage = suggestion;
    this.sendMessage();
  }

  private animateDots() {
    let count = 1;
    this.dotInterval = setInterval(() => {
      const dots = '.'.repeat(count);
      const lastIndex = this.messages.length - 1;
      if (this.messages[lastIndex]?.sender === 'Chorão') {
        this.messages[lastIndex].text = dots;
      }
      count = count === 3 ? 1 : count + 1;
    }, 400);
  }

  private stopDots() {
    clearInterval(this.dotInterval);
    this.dotInterval = null;
  }

  private async fetchFullHistory(): Promise<boolean> {
    try {
      const response = await axios.get('http://localhost:5000/logs');
      const logs = response.data.logs;

      if (!logs.length) return false;

      for (const log of logs.reverse()) {
        this.messages.push({ sender: 'Você', text: log.user });
        this.messages.push({ sender: 'Chorão', text: log.bot });
      }

      return true;
    } catch (err) {
      console.error('Erro ao carregar logs:', err);
      return false;
    }
  }

  private async created() {
    const hasHistory = await this.fetchFullHistory();

    if (!hasHistory) {
      this.messages.push({
        sender: 'Chorão',
        text: 'Fala aí, mano! Precisa de ajuda com skate ou pistas? Manda aí.',
      });
    }
  }

  private beforeUnmount() {
    localStorage.setItem('chat-history', JSON.stringify(this.messages));
  }

  private mounted() {
    const localHistory = localStorage.getItem('chat-history');
    if (localHistory) {
      this.messages = JSON.parse(localHistory);
    }
  }
}

export default toNative(ChatBotComponent);
</script>

<style scoped>
.chat-box {
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
}

.message-bubble {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 10px;
  word-break: break-word;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.message-bubble.bot {
  align-self: flex-start;
  background-color: #f0f0f0;
  color: #000;
}

.message-bubble.user {
  align-self: flex-end;
  background-color: #1976d2;
  color: #fff;
}

.sender {
  font-size: 0.75rem;
  font-weight: bold;
  margin-bottom: 2px;
}

.text {
  font-size: 0.95rem;
  white-space: pre-wrap;
}

.active-suggestion {
  background-color: #2196f3 !important;
  color: white !important;
}
</style>
