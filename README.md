# AgentShield Midnight Escrow — Akindo Buildathon Entry

**Track:** Build Privacy-First Apps on Midnight  
**Wave 3:** October 13 – November 2, 2026  
**License:** Apache 2.0

---

## Current Scope (honest)

- Public ledger flags: `escrowCreated`, `escrowReleased`, `escrowRefunded`.
- Circuits: `storeMessage` (regression), `createEscrow`, `releaseEscrow`,
  `refundEscrow` with guards.
- Tests: deploy + storeMessage + create/release/refund transitions.
- **Not yet implemented:** real DUST locking, payer/payee roles, amounts,
  private release condition, frontend. These are roadmap items.

## Build

```bash
yarn install
compact compile contracts/escrow.compact contracts/managed/escrow
```

## Try It (Local Devnet)

```bash
yarn env:up
yarn wait:dust
yarn test:local
yarn env:down
```

## License

Apache 2.0
