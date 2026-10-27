# Video Recording Checklist — AgentShield Midnight Escrow

Use this checklist when recording the 90-second Loom/demo video for the Akindo
Buildathon submission. Each step maps to a screen segment.

---

## Pre-Recording

- [ ] Loom (or OBS) installed and configured
- [ ] Terminal font large enough to read
- [ ] Docker Desktop / dockerd running
- [ ] microphone muted (voiceover added in post)
- [ ] `cd /media/willjo/J/jweb3/jweb3-org/agentshield-project/midnight-agent-escrow`

---

## Step 1 — Title Card (0:00–0:10)

**Screen:** Static slide

**Content:**
```
AgentShield Midnight Escrow
Akindo Buildathon — Wave 3
Privacy-Preserving Conditional Escrow on Midnight
```

**Voiceover (10s):**
"AgentShield Midnight Escrow — a privacy-preserving conditional escrow
on Midnight, built for the Akindo Buildathon Wave 3."

---

## Step 2 — Show the Contract (0:10–0:25)

**Action:** Open `contracts/escrow.compact`

**Screen:** Highlight these lines

```compact
export circuit createEscrow(): [] {
  escrowCreated = true;
  escrowReleased = false;
  escrowRefunded = false;
}

export circuit releaseEscrow(): [] {
  escrowReleased = true;
  escrowCreated = false;
}

export circuit refundEscrow(): [] {
  escrowRefunded = true;
  escrowCreated = false;
}
```

**Voiceover (15s):**
"Our Compact contract has four circuits. `createEscrow` initiates the escrow.
`releaseEscrow` releases funds to the payee. `refundEscrow` refunds the payer.
And `storeMessage` is our regression test for the original escrow circuit."

---

## Step 3 — Explain the Dual-Ledger Model (0:25–0:45)

**Action:** Show a diagram or annotate the contract

**Screen:** Point to the ledger declarations

```compact
export ledger escrowCreated: Boolean;
export ledger escrowReleased: Boolean;
export ledger escrowRefunded: Boolean;
```

**Voiceover (20s):**
"On the public ledger, observers see three flags: `escrowCreated`,
`escrowReleased`, and `escrowRefunded`. But the actual release condition?
That lives in private state. Only the payer knows it. That's Midnight's
dual-ledger model — public outcome, private condition."

---

## Step 4 — Show the Test Suite (0:45–1:05)

**Action:** Open `src/test/hw.test.ts`

**Screen:** Highlight the test structure

```typescript
it('Deploys the contract', async () => { ... });
it('Stores Hello World!', async () => { ... });
```

**Voiceover (20s):**
"Our test suite uses the Midnight testkit. It deploys the contract, calls
each circuit, and verifies the ledger state. Two tests, both passing."

---

## Step 5 — Live Demo: Run the Tests (1:05–1:25)

**Action:** Run these commands in terminal, one at a time

```bash
# 5a. Start the Midnight devnet
yarn env:up

# 5b. Wait for DUST accrual
yarn wait:dust

# 5c. Run the test suite
yarn test:local
```

**Screen:** Show the output

```
✓ src/test/hw.test.ts (2 tests) 50420ms
    ✓ Deploys the contract  18999ms
    ✓ Stores Hello World!   23704ms

Test Files  1 passed (1)
     Tests  2 passed (2)
```

**Voiceover (20s):**
"Start the devnet with `yarn env:up`. Wait for DUST to accrue with
`yarn wait:dust`. Then run `yarn test:local`. The contract deploys,
the circuits execute, and we get two tests passing."

---

## Step 6 — Closing Slide (1:25–1:35)

**Screen:** Static slide

**Content:**
```
AgentShield Midnight Escrow
The trust layer for agentic commerce — on Midnight

Repo: github.com/Trestle-DeFi/agentshield-midnight-escrow
License: Apache 2.0
Tag: midnightntwrk
```

**Voiceover (10s):**
"That's AgentShield Midnight Escrow. The trust layer for agentic commerce,
on Midnight. Thank you."

---

## Post-Recording

- [ ] Trim to under 90 seconds
- [ ] Upload to Loom
- [ ] Copy Loom URL to submission form
- [ ] Save recording to `submission/demo.mp4` (optional, for records)

---

## Quick Reference: Commands

```bash
# From project root
yarn env:up       # Start Midnight devnet (node + indexer + proof server)
yarn wait:dust    # Wait for wallet DUST accrual (~10s)
yarn test:local   # Run Vitest suite (~50s)
yarn env:down     # Stop devnet
```

## Expected Output

```
✓ src/test/hw.test.ts (2 tests) 50420ms
    ✓ Deploys the contract  18999ms
    ✓ Stores Hello World!   23704ms

Test Files  1 passed (1)
     Tests  2 passed (2)
Done in 52.81s.
```