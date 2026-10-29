// Minimal UX wiring placeholder.
// Real implementation: import midnight-js providers + compiled contract,
// build providers from LOCAL_CONFIG, then call submitCallTx per button.
// See src/providers.ts, src/config.ts, src/test/hw.test.ts for the pattern.
const state = document.getElementById('state');
document.querySelectorAll('button').forEach((b) => {
  b.addEventListener('click', () => {
    state.textContent = `Clicked ${b.id} — wire to midnight-js submitCallTx (see src/test/hw.test.ts)`;
  });
});
