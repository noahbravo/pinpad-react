# Interactive Pin Pad

A small React single-page app that simulates a PIN keypad.

## Behavior

- The PIN is 4 digits by default.
- Entered digits are masked except for the latest digit.
- The PIN is validated once all digits have been entered.
- A correct PIN displays `ok`, then resets.
- An incorrect PIN displays `error`, then resets.
- After 3 incorrect attempts, the keypad displays `locked` for 30 seconds.

## Stack

- React 19
- TypeScript
- Vite
- Vitest
- Testing Library
- Sass modules

## Getting Started

Install dependencies:

```sh
npm install
```

Run the development server:

```sh
npm start
```

Run tests:

```sh
npm test
```

Build for production:

```sh
npm run build
```

## Project Structure

- `src/main.tsx`: app entrypoint.
- `src/components/App/PinPadApp.tsx`: presentational keypad composition.
- `src/components/App/usePinPad.ts`: PIN state machine, masking, reset timer, lockout rules.
- `src/components/Button/PinPadButton.tsx`: keypad button.
- `src/components/Icons/HoneycombIcon.tsx`: animated background icon.

## Configuration

`PinPadApp` accepts optional props for the PIN and timings:

```tsx
<PinPadApp
  correctPin="4747"
  maxAttempts={3}
  resetTime={1200}
  lockedTime={30000}
/>
```
