# AgentShield Midnight Escrow — Akindo Buildathon Submission

**Track:** Build Privacy-First Apps on Midnight  
**Wave 3:** October 13 – November 2, 2026  
**Repo:** https://github.com/Trestle-DeFi/agentshield-midnight-escrow  
**License:** Apache 2.0  
**Tag:** `midnightntwrk`

---

## 1. Problem

AI agents need to make conditional payments — but today's escrow solutions are
either centralized (custodial risk) or transparent (no privacy). Midnight solves
this: the *condition* stays private, the *outcome* is public.

## 2. Solution

A privacy-preserving conditional escrow on Midnight. An AI agent locks DUST in
a Compact smart contract. Funds release only when a ZK-verified condition holds.

**Four circuits:**
- `createEscrow` — initiate escrow
- `releaseEscrow` — release to payee
- `refundEscrow` — refund payer
- `storeMessage` — regression test for escrow

## 3. Dual-Ledger Model

| Public Ledger | Private State |
|---|---|
| `escrowCreated` | Release condition |
| `escrowReleased` | Payee identity |
| `escrowRefunded` | Amount |

Observers see *that* an escrow exists and *whether* it settled — never *why*.

## 4. How It Works

1. Payer calls `createEscrow()` → locks DUST, sets `escrowCreated = true`
2. Condition stays in private state
3. Payer calls `releaseEscrow()` → funds go to payee
4. OR payer calls `refundEscrow()` → funds return to payer
5. Observers read `escrowReleased` / `escrowRefunded` on the public ledger

## 5. Testing

```bash
yarn env:up      # Start Midnight devnet
yarn wait:dust   # Wait for DUST accrual
yarn test:local  # Run Vitest suite
```

**Result:** 2 tests passing (Deploys the contract, Stores Hello World!).

## 6. Roadmap

- **Phase A:** Multi-party escrow (payee + arbiter)
- **Phase B:** Condition language (time locks, oracle attestations)
- **Phase C:** Cross-chain with EVM leg (Base Sepolia x402)

## 7. Team

Trestle-DeFi — builders of AgentShield, the trust layer for agentic commerce.