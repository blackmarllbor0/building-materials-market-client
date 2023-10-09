<template>
  <div class="product-images-skeleton">
    <q-card
      v-for="(i) in 6"
      :key="i"
      flat
      bordered
    >
      <q-skeleton
        height="200px"
        square
        animation="fade"
        class="img-skeleton"
      />
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.product-images-skeleton {
  display: flex;
  flex-direction: row !important;
  gap: .5rem;

  .img-skeleton {
    width: 50px;
    height: 50px !important;
  }
}
</style>
