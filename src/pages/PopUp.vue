<script lang="ts" setup>
import { VIDEO_SUMMARIZER_GUID } from '../js/consts';
import { getCurrentTabUrl } from '../utils';
import { ref } from 'vue';

console.log('Hello from the popup!');

const tabUrl = ref('');

getCurrentTabUrl()
  .then((url) => {
    console.log(url); // Do something with the URL here
    tabUrl.value = url;
  })
  .catch((error) => {
    console.error(error); // Handle errors here
  });

const shortcuts = [
  {
    name: 'Video Summarizer',
    guid: VIDEO_SUMMARIZER_GUID,
    url: '',
    getURL() {
      return `https://chat.openai.com/share/${this.guid}?video=${encodeURIComponent(tabUrl.value)}`;
    },
  },
];
</script>

<template>
  tabUrl: {{ tabUrl }}
  <div>
    <!-- Create links for all shortcuts -->
    <ul v-for="shortcut in shortcuts" :key="shortcut.guid">
      <li>
        <a :href="shortcut.getURL()">
          {{ shortcut.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style>
html,
body {
  width: 300px;
  height: 400px;
  padding: 0;
  margin: 0;
}

body {
  //background-color: rgb(36, 36, 36);
}

body > div {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
}

img {
  width: 200px;
  height: 200px;
}

h1 {
  font-size: 18px;
  color: white;
  font-weight: bold;
  margin: 0;
}

p {
  color: white;
  opacity: 0.7;
  margin: 0;
}

code {
  font-size: 12px;
  padding: 2px 4px;
  background-color: #ffffff24;
  border-radius: 2px;
}
</style>
