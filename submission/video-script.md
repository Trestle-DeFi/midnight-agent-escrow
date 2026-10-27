# Video Demo Script — AgentShield Midnight Escrow
**Target:** 90 seconds
**Voiceover + screen recording**

---

**[0:00-0:10] Title card**
"AgentShield Midnight Escrow — Akindo Buildathon, Wave 3"

**[0:10-0:25] Hook**
"Today I'm showing you a privacy-preserving conditional escrow on Midnight.
An AI agent locks DUST. Funds release only when a ZK-verified condition holds.
The condition stays private. The outcome is public. That's the dual-ledger model."

**[0:25-0:45] Code walkthrough**
"Here's our Compact contract. Four circuits.
`createEscrow` initiates the escrow and sets `escrowCreated = true`.
`releaseEscrow` releases funds to the payee.
`refundEscrow` refunds the payer.
And `storeMessage` is our regression test for the escrow circuit."

**[0:45-1:05] Dual-ledger explanation**
"On the public ledger, observers see three flags:
`escrowCreated`, `escrowReleased`, `escrowRefunded`.
But the actual release condition? That lives in private state.
Only the payer knows it. That's Midnight's dual-ledger model in action."

**[1:05-1:25] Live demo**
"Now let's run it. Start the devnet, wait for DUST, and run the tests.
The contract deploys, the circuits execute, and we get 2 tests passing."

**[1:25-1:35] Closing**
"That's AgentShield Midnight Escrow. The trust layer for agentic commerce,
on Midnight. Thank you."

---
**Screen recording plan:**
1. Title card (0:00-0:10)
2. `escrow.compact` source (0:10-0:45)
3. `hw.test.ts` test suite (0:45-1:05)
4. Terminal: `yarn env:up` → `yarn wait:dust` → `yarn test:local` (1:05-1:25)
5. Closing slide with repo URL (1:25-1:35)