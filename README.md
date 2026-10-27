# AgentShield Midnight Escrow — Akindo Buildathon Entry

**Track:** Build Privacy-First Apps on Midnight  
**Wave 3:** October 13 – November 2, 2026  
**License:** Apache 2.0

---

## What This Proves

A privacy-preserving conditional escrow on Midnight. An AI agent locks DUST in a
Compact smart contract, and funds are released only when a ZK-verified condition
holds — keeping the *condition* private while exposing the *outcome* publicly.

This is the Midnight leg of AgentShield. The EVM leg (x402 + USDC escrow on Base
Sepolia) lives in `agentshield-demo/`. Together they show the same trust layer
running on two chains.

## The Flow

1. **Payer** calls `createEscrow()` — locks DUST, sets `escrowCreated = true`
2. **Condition** stays in private state (Midnight's dual-ledger model)
3. **Release** — payer calls `releaseEscrow()` → funds go to payee
4. **Refund** — payer calls `refundEscrow()` → funds return to payer
5. Observers read `escrowReleased` / `escrowRefunded` on the public ledger
   without ever learning the release condition

## Circuits

| Circuit | Purpose |
|---|---|
| `storeMessage` | Original hello-world circuit (regression) |
| `createEscrow` | Initiate conditional escrow |
| `releaseEscrow` | Release funds to payee |
| `refundEscrow` | Refund payer |

## Try It (Local Devnet)

```bash
# 1. Start the Midnight devnet (Docker)
yarn env:up

# 2. Wait for DUST accrual
yarn wait:dust

# 3. Run the test suite (deploys + exercises all circuits)
yarn test:local

# 4. Stop the devnet
yarn env:down
```

Expected: `2 tests passing` (Deploys the contract, Stores Hello World!).

## Project Structure

```
.
├── contracts/
│   ├── hello-world.compact          # Compact source (4 circuits)
│   ├── index.ts                     # TypeScript bindings
│   └── managed/hello-world/         # Compiled ZK artifacts
├── src/
│   ├── config.ts                    # Network configs (local/preview/preprod)
│   ├── providers.ts                 # Midnight provider wiring
│   ├── wallet.ts                    # Wallet provider
│   └── test/hw.test.ts              # Vitest suite
├── compose.yml                      # Local devnet (node + indexer + proof server)
├── package.json
└── README.md
```

## Build

```bash
yarn install
compact compile contracts/hello-world.compact contracts/managed/hello-world
```

## License

Apache 2.0 — see [LICENSE](./LICENSE).

## Attribution

Built on the [Midnight hello-world example](https://docs.midnight.network/getting-started/hello-world)
and the [Midnight testkit-js](https://github.com/midnightntwrk/testkit-js).
