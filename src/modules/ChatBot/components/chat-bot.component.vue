<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="chatbot">
          <v-card-title class="headline">Chorão BOT - Suporte</v-card-title>
          <v-divider />

          <v-card-text>
            <v-chip-group class="mb-4" column active-class="active-suggestion">
              <v-chip v-for="suggestion in suggestions" :key="suggestion" @click="useSuggestion(suggestion)">
                {{ suggestion }}
              </v-chip>
            </v-chip-group>

            <div class="chat-box">
              <div
                v-for="(msg, index) in messages"
                :key="index"
                :class="['message-wrapper', msg.sender === 'Você' ? 'user' : 'bot']"
              >
                <v-row no-gutters align="center" :justify="msg.sender === 'Você' ? 'end' : 'start'">
                  <v-col cols="auto" v-if="msg.sender === 'Chorão'">
                    <v-avatar size="56" class="avatar">
                      <img src="https://www.tribunapr.com.br/wp-content/uploads/sites/1/2009/11/03-11-09_chorao2.png" alt="Chorão">
                    </v-avatar>
                  </v-col>

                  <v-col cols="auto">
                    <div :class="['message-bubble', msg.sender === 'Você' ? 'user' : 'bot']">
                      <div class="sender">{{ msg.sender }}</div>
                      <div class="text">{{ msg.text }}</div>
                    </div>
                  </v-col>

                  <v-col cols="auto" v-if="msg.sender === 'Você'">
                    <v-avatar size="56" class="avatar">
                      <img src="https://cdn.shopify.com/s/files/1/1566/2889/files/Tony-Hawk-8.jpg?v=1625823277" alt="Você">
                    </v-avatar>
                  </v-col>
                </v-row>
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

            <v-btn color="primary" block class="mt-2" :loading="loading" @click="sendMessage">Enviar</v-btn>
            <v-btn color="red" block class="mt-4" @click="resetChat">Reiniciar Conversa</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import axios from 'axios';

@Component
class ChatBotComponent extends Vue {
  private userMessage = '';

  private messages: { sender: string; text: string }[] = [];

  private loading: boolean = false;

  private dotInterval: any = null;

  private suggestions: string[] = [
    'Como alugar uma pista?',
    'Quais são os horários de funcionamento?',
    'Como cancelar o aluguel de uma pista?',
    'Como saber se uma pista está disponível?',
    'Modalidades de skate mais comuns',
  ];

  private async sendMessage() {
    const message = this.userMessage.trim();
    if (!message) return;

    this.addMessage('Você', message);
    this.userMessage = '';
    this.loading = true;
    this.addMessage('Chorão', '.');
    this.animateDots();

    try {
      const { data } = await axios.post('http://localhost:5000/chat', { message });
      this.updateLastBotMessage(data.reply || 'Não consegui entender, tente reformular a pergunta.');
    } catch (error) {
      this.updateLastBotMessage('Erro ao se comunicar. Tente novamente mais tarde.');
    } finally {
      this.loading = false;
    }
  }

  private addMessage(sender: string, text: string) {
    this.messages.push({ sender, text });
    this.saveToLocalStorage();
  }

  private updateLastBotMessage(text: string) {
    this.stopDots();
    const last = this.messages.at(-1);
    if (last?.sender === 'Chorão' && ['.', '..', '...'].includes(last.text)) {
      this.messages.pop();
    }
    this.addMessage('Chorão', text);
  }

  private useSuggestion(suggestion: string) {
    this.userMessage = suggestion;
    this.sendMessage();
  }

  private animateDots() {
    let count = 1;
    this.dotInterval = setInterval(() => {
      const dots = '.'.repeat(count);
      const last = this.messages.at(-1);
      if (last?.sender === 'Chorão') last.text = dots;
      count = count === 3 ? 1 : count + 1;
    }, 400);
  }

  private stopDots() {
    clearInterval(this.dotInterval);
    this.dotInterval = null;
  }

  private async resetChat() {
    try {
      await axios.post('http://localhost:5000/reset');
      this.messages = [];
      localStorage.removeItem('chat-history');
      this.addMessage('Chorão', 'Sessão reiniciada! Pode mandar sua dúvida de novo');
    } catch (error) {
      console.error('Erro ao resetar sessão:', error);
    }
  }

  private async fetchFullHistory(): Promise<boolean> {
    try {
      const { data } = await axios.get('http://localhost:5000/logs');
      if (!data.logs.length) return false;

      const newMessages: { sender: string; text: string }[] = [];

      for (const log of data.logs.reverse()) {
        newMessages.push({ sender: 'Você', text: log.user });
        newMessages.push({ sender: 'Chorão', text: log.bot });
      }

      const existing = new Set(this.messages.map(m => `${m.sender}:${m.text}`));
      for (const msg of newMessages) {
        const key = `${msg.sender}:${msg.text}`;
        if (!existing.has(key)) this.messages.push(msg);
      }

      this.saveToLocalStorage();
      return true;
    } catch (err) {
      console.error('Erro ao carregar logs:', err);
      return false;
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('chat-history', JSON.stringify(this.messages));
  }

  private mounted() {
    const saved = localStorage.getItem('chat-history');
    if (saved) {
      this.messages = JSON.parse(saved);
    }
  }

  private async created() {
    const hasHistory = await this.fetchFullHistory();
    if (!hasHistory && this.messages.length === 0) {
      this.addMessage('Chorão', 'Fala aí, mano! Precisa de ajuda com skate ou pistas? Manda aí.');
    }
  }

  private beforeUnmount() {
    this.saveToLocalStorage();
  }
}

export default toNative(ChatBotComponent);
</script>

<style scoped>
.message-wrapper {
  margin-bottom: 10px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover !important;
  /* object-position: center; */
}

.chat-box {
  max-height: 600px;
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
  background-color: #f0f0f0;
  color: #000;
}

.message-bubble.user {
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
