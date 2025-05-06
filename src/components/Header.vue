<template>
  <div class="header-comp">
    <div class="lang-selector" @click="state.showLangSelector = true">
      {{ localeName }}
      <van-icon name="arrow-down" />
    </div>
    <div class="connect-wallet">
      <van-button
        v-if="store.walletAddress"
        type="primary"
        size="small"
        @click="copy(store.walletAddress)"
      >
        {{ store.formattedWalletAddress }}
      </van-button>

      <van-button v-else type="primary" size="small" @click="store.connectWallet">
        {{ $t('connectWallet') }}
      </van-button>
    </div>

    <van-action-sheet
      v-model:show="state.showLangSelector"
      :actions="LANGUAGE_LIST"
      @select="handleSelectLang"
    />
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { useClipboard } from '@/hooks/useClipboard';
import { LANGUAGE_LIST, setLocale } from '@/locales';
import { useStore } from '@/store';

const { locale } = useI18n();
const store = useStore();
const { copy } = useClipboard();

const state = reactive({
  showLangSelector: false,
});

const localeName = computed(() => LANGUAGE_LIST.find((item) => item.value === locale.value)?.name);

const handleSelectLang = (item) => {
  setLocale(item.value);
  state.showLangSelector = false;
};
</script>

<style lang="less" scoped>
.header-comp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 12px 0;

  .van-button {
    font-size: 13px;
    font-weight: 500;
  }
}
</style>
