<template>
  <div class="about-page container">
    <div class="about-stack">
      <!-- Top -->
      <h1 class="about-title">About stockUp</h1>

      <!-- Middle (exact line breaks) -->
      <pre class="about-text">



        StockUp is a simple inventory web app that helps you organize items
        by category and track their status at a glance.


        You can create categories (active or inactive),
        add items inside them, and assign each item a storage state
        — Not Set, No Quantity, Low Quantity, or Stocked —
        so you always know what needs attention.


        With quick create, edit, and delete actions,
        StockUp keeps stock management clear,
        fast and structured without unnecessary complexity.


      </pre>

      <!-- Bottom -->
      <div class="about-footer">
        <div>WebApp created & designed by</div>
        <div class="fw-semibold">Ibrahim Meleha</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.about-page {
  min-height: calc(100vh - 60px); /* nav approx; adjust if needed */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* This keeps top/middle/bottom close together. */
.about-stack {
  width: 100%;
  max-width: 900px;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 12px 0;
}

/* Title closer */
.about-title {
  margin: 0;
}

/* Exact formatting */
.about-text {
  margin: 0;
  white-space: pre-wrap;   /* keeps your manual line breaks */
  font-family: inherit;
  font-size: 1.15rem;
  line-height: 1.6;
}

/* Footer closer */
.about-footer {
  margin: 0;
}
</style>
