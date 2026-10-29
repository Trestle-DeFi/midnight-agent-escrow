# AgentShield Midnight Escrow — Akindo Buildathon Submission

**Track:** Build Privacy-First Apps on Midnight  
**Wave 3:** October 13 – November 2, 2026  
**Repo:** https://github.com/Trestle-DeFi/agentshield-midnight-escrow  
**License:** Apache 2.0  
**Tag:** `midnightntwrk`

---

## 1. Problem
AI agents need conditional payments — centralized escrow has custodial risk, transparent escrow has no privacy. Midnight keeps the *condition* private while the *outcome* is public.

## 2. Solution
Privacy-preserving conditional escrow on Midnight. An AI agent locks DUST in a Compact smart contract.

**Five circuits:**
- `createEscrow` — initiate escrow
- `releaseEscrow` — release to payee
- `refundEscrow` — refund payer
- `storeMessage` — regression test

## 3. Dual-Ledger Model
| Public Ledger | Private State |
|---|---|
| `escrowCreated` | Release condition |
| `escrowReleased` | Payee identity |
| `escrowRefunded` | Amount |

Observers see *that* an escrow exists and *whether* it settled — never *why*.

## 4. Deployed (local devnet)
Contract address: `b96b821f75a25b2dde9bdfdff4970304415565d9cc58747f985f66207c840d0a`

## 5. Testing
```bash
yarn env:up
yarn wait:dust
yarn test:local
```
Result: **5 tests passing** (Deploy contract, Store Hello World, Create escrow, Release escrow, Refund escrow).

## 6. Roadmap
- Multi-party escrow (payee + arbiter)
- Condition language (time locks, oracle attestations)
- Cross-chain with EVM leg

## 7. Team
Trestle-DeFi — builders of AgentShield, the trust layer for agentic commerce.
