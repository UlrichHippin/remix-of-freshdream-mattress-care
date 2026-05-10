# Plan: Update ADMIN_SETUP_CODE Secret

## Goal
Update the `ADMIN_SETUP_CODE` runtime secret to a new value provided by the user.

## Why
The `ADMIN_SETUP_CODE` is used by the `bootstrap-admin` edge function to gate the creation of the first admin account. Updating it ensures only authorized users can perform initial setup.

## Steps
1. Call the `secrets--update_secret` tool with `ADMIN_SETUP_CODE`.
2. The user will be prompted to enter the new secret value in a secure form.
3. Confirm the secret is updated and available to edge functions.

## Impact
- No file changes are required.
- The new value takes effect immediately for the `bootstrap-admin` edge function.
